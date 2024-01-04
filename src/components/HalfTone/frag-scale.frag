#define SQRT2_MINUS_ONE 0.41421356
#define SQRT2_HALF_MINUS_ONE 0.20710678
#define PI2 6.28318531
#define SHAPE_DOT 1
#define SHAPE_ELLIPSE 2
#define SHAPE_LINE 3
#define SHAPE_SQUARE 4
#define BLENDING_LINEAR 1
#define BLENDING_MULTIPLY 2
#define BLENDING_ADD 3
#define BLENDING_LIGHTER 4
#define BLENDING_DARKER 5

uniform sampler2D tDiffuse;
uniform float radius;
uniform float rotateR;
uniform float rotateG;
uniform float rotateB;
uniform float scatter;
uniform float width;
uniform float height;
uniform int shape;
uniform bool disable;
uniform float blending;
uniform int blendingMode;
varying vec2 vUV;
uniform bool greyscale;
const int samples = 8;
uniform sampler2D tex;

float hypot(float x, float y) {
    return sqrt(x * x + y * y);
}

float rand(vec2 seed) {
    return fract(sin(dot(seed.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

struct Cell {
    vec2 normal;
    vec2 p1;
    vec2 p2;
    vec2 p3;
    vec2 p4;
    float samp2;
    float samp1;
    float samp3;
    float samp4;
};

float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

vec4 getSample(vec2 point) {
    vec4 tex = texture2D(tDiffuse, vec2(point.x / width, point.y / height));
    float base = rand(vec2(floor(point.x), floor(point.y))) * PI2;
    float step = PI2 / float(samples);
    for(int i = 0; i < samples; ++i) {
        float r = base + step * float(i);
        vec2 coord = point;
        tex += texture2D(tDiffuse, vec2(coord.x / width, coord.y / height));
    }
    tex /= float(samples) + 1.0;
    return tex;
}

float getCellSample(Cell c) {
    vec4 samp1 = getSample(c.p1);
    vec4 samp2 = getSample(c.p2);
    vec4 samp3 = getSample(c.p3);
    vec4 samp4 = getSample(c.p4);

    float combinedSamples = (samp1.r + samp1.g + samp1.b +
        samp2.r + samp2.g + samp2.b +
        samp3.r + samp3.g + samp3.b +
        samp4.r + samp4.g + samp4.b) / 12.0;
    return combinedSamples;
}

Cell getReferenceCell(vec2 p, vec2 origin, float grid_angle, float step) {
    Cell c;
    vec2 n = vec2(cos(grid_angle), sin(grid_angle));
    float threshold = step * 0.5;
    float dot_normal = n.x * (p.x - origin.x) + n.y * (p.y - origin.y);
    float dot_line = -n.y * (p.x - origin.x) + n.x * (p.y - origin.y);
    vec2 offset = vec2(n.x * dot_normal, n.y * dot_normal);
    float offset_normal = mod(hypot(offset.x, offset.y), step);
    float normal_dir = (dot_normal < 0.0) ? 1.0 : -1.0;
    float normal_scale = ((offset_normal < threshold) ? -offset_normal : step - offset_normal) * normal_dir;
    float offset_line = mod(hypot((p.x - offset.x) - origin.x, (p.y - offset.y) - origin.y), step);
    float line_dir = (dot_line < 0.0) ? 1.0 : -1.0;
    float line_scale = ((offset_line < threshold) ? -offset_line : step - offset_line) * line_dir;
    c.normal = n;
    c.p1.x = p.x - n.x * normal_scale + n.y * line_scale;
    c.p1.y = p.y - n.y * normal_scale - n.x * line_scale;

    float normal_step = normal_dir * ((offset_normal < threshold) ? step : -step);
    float line_step = line_dir * ((offset_line < threshold) ? step : -step);
    c.p2.x = c.p1.x - n.x * normal_step;
    c.p2.y = c.p1.y - n.y * normal_step;
    c.p3.x = c.p1.x + n.y * line_step;
    c.p3.y = c.p1.y - n.x * line_step;
    c.p4.x = c.p1.x - n.x * normal_step + n.y * line_step;
    c.p4.y = c.p1.y - n.y * normal_step - n.x * line_step;
    return c;
}

vec2 calculateCellSize(Cell cell) {
    return vec2(hypot(cell.p2.x - cell.p1.x, cell.p2.y - cell.p1.y), hypot(cell.p3.x - cell.p1.x, cell.p3.y - cell.p1.y));
}

// Map the point to the cell's local space and normalize
vec2 normalizeToLocalCellSpace(vec2 p, Cell cell, vec2 cellSize) {
    vec2 localPos = p - cell.p1;
    return vec2(localPos.x / cellSize.x, localPos.y / cellSize.y);
}

// Determine the quadrant of the cell
float getCellQuadrant(vec2 normalizedPos) {
    return float(normalizedPos.x > 0.5) + (float(normalizedPos.y > 0.5) * 2.);
}

float calculateTextureIndex(float c, float quadrant) {
    return 8.0 - floor(c * 9.0) + quadrant - 1.0;
}

// Calculate texture coordinates for the given index and normalized position
vec2 calculateTextureCoordinates(float index, vec2 normalizedPos, float texWidth) {
    float texOffset = index * texWidth;
    return vec2(texOffset + normalizedPos.x * texWidth, normalizedPos.y);
}

vec4 drawImageInCellBasedOnC(Cell cell, vec2 p, sampler2D tex, float c) {
    float scale = 0.5;
    float texWidth = 1.0 / 8.0;
    vec2 cellSize = calculateCellSize(cell);
    vec2 normalizedPos = normalizeToLocalCellSpace(p, cell, cellSize);
    float quadrant = getCellQuadrant(normalizedPos);
    normalizedPos = fract(normalizedPos * 2.0);
    float index = calculateTextureIndex(c, quadrant);

    if(index < 1.0) {
        return vec4(0.0, 0.0, 0.0, 0.0); // Return red color for empty quadrants
    }

    // Calculate the center offset for the scaled image
    vec2 centerOffset = (vec2(1.0) - scale) * 0.5;

    float inset = 0.0009;

    // Check if the current fragment is within the scaled image area
    if(normalizedPos.x >= centerOffset.x + inset && normalizedPos.x <= (centerOffset.x + scale) - inset &&
        normalizedPos.y >= centerOffset.y + inset && normalizedPos.y <= (centerOffset.y + scale) - inset) {
        // Adjust normalizedPos to account for the scale, centering, and inset
        normalizedPos = (normalizedPos - centerOffset) / scale;

        // if outside inset, return red
        if(normalizedPos.x < inset || normalizedPos.x > 1.0 - inset || normalizedPos.y < inset || normalizedPos.y > 1.0 - inset) {
            return vec4(1.0, 0.0, 0.0, 1.0);
        }

        vec2 texCoords = calculateTextureCoordinates(index, normalizedPos, texWidth);
        return texture2D(tex, texCoords);
    } else {
        return vec4(1.0, 0.0, 0.0, 0.0); // Return red color for the area outside the scaled image
    }
}

void main() {
    if(!disable) {
        vec2 p = vec2(vUV.x * width, vUV.y * height);
        vec2 origin = vec2(0, 0);
        float aa = (radius < 2.5) ? radius * 0.5 : 1.25;
        Cell cell = getReferenceCell(p, origin, 0.0, radius);
        float c = getCellSample(cell);

        vec4 texColor = drawImageInCellBasedOnC(cell, p, tex, c);

        gl_FragColor = texColor;
    } else {
        gl_FragColor = texture2D(tDiffuse, vUV);
    }
}