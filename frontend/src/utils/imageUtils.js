import { DEFAULT_PRODUCT_IMAGE, API_BASE_URL, PRODUCT_IMAGE_DIMENSIONS } from './constants';

/**
 * Get final image URL, handling both relative and absolute URLs
 * @param {string} url - Original image URL or path
 * @returns {string} Final image URL with proper base
 */
export const getImageUrl = (url) => {
    if (!url) return DEFAULT_PRODUCT_IMAGE;
    
    // Return as is if it's already an absolute URL
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    
    // Add API base URL for relative paths
    return `${API_BASE_URL}${url.startsWith('/') ? url : `/${url}`}`;
};

/**
 * Format image URL with dimensions for optimization
 * @param {string} url - Original image URL
 * @param {string} type - Type of image (card, detail, thumbnail)
 * @returns {string} Formatted image URL with dimensions
 */
export const formatImageUrl = (url, type = 'card') => {
    if (!url) return DEFAULT_PRODUCT_IMAGE;
    
    const dimensions = PRODUCT_IMAGE_DIMENSIONS[type];
    if (!dimensions) return url;

    // Add dimensions as query parameters
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}width=${dimensions.width}&height=${dimensions.height}`;
};

/**
 * Handle image loading errors
 * @param {Event} event - Error event from img element
 */
export const handleImageError = (event) => {
    const img = event.target;
    if (!img.src.includes('default')) {
        img.src = DEFAULT_PRODUCT_IMAGE;
    }
};

/**
 * Check if an image exists and is valid
 * @param {string} url - Image URL to validate
 * @returns {Promise<boolean>} Whether the image is valid
 */
export const validateImage = async (url) => {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        const contentType = response.headers.get('content-type');
        return response.ok && contentType?.startsWith('image/');
    } catch {
        return false;
    }
};