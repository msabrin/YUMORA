import { whatsappConfig } from '../config/whatsapp';

/**
 * Formats product details into a WhatsApp message
 * Handles three product types: general, mystery, and color cup
 *
 * @param {Object} product - Product object from data.js
 * @param {Object} options - Selected options (quantity, scoop, color)
 * @returns {string} Formatted message string
 */
export const formatWhatsAppMessage = (product, options = {}) => {
  const { greeting } = whatsappConfig;

  // General Products (browseProducts - have 'name' property)
  if (product.name) {
    const quantity = options.quantity || 1;
    const total = product.price * quantity;

    return `${greeting}

📦 Product: ${product.name}
💰 Price: $${product.price}
🎨 Color: ${product.color}
📝 Category: ${product.category}
${quantity > 1 ? `📊 Quantity: ${quantity}\n💵 Total: $${total.toFixed(2)}` : ''}

${product.description}`;
  }

  // Mystery Box Products (special-1, special-2)
  if (product.type === 'mystery') {
    const scoopLabels = {
      scoop1: '1 Scoop',
      scoop2: '2 Scoops',
      scoop3: '3 Scoops',
      custom: 'Custom Mystery'
    };

    const selectedScoop = options.scoop || 'scoop1';
    const scoopLabel = scoopLabels[selectedScoop];
    const price = product.pricing[selectedScoop];

    return `${greeting}

🎁 Mystery Box: ${product.title}
🍦 Selection: ${scoopLabel}
💰 Price: $${price}

${product.description}`;
  }

  // Color Cup Products (special-3)
  if (product.type === 'cup') {
    const selectedColor = options.color || product.colors[0];

    return `${greeting}

🥤 Product: ${product.title}
🎨 Selected Color: ${selectedColor}
💰 Price: $${product.price}

${product.description}`;
  }

  // Fallback for unknown product types
  return `${greeting}\n\nProduct: ${product.title || product.name}\nPrice: $${product.price}`;
};

/**
 * Generates a WhatsApp URL with pre-filled message
 *
 * @param {Object} product - Product object from data.js
 * @param {Object} options - Selected options (quantity, scoop, color)
 * @returns {string} Complete WhatsApp URL
 */
export const generateWhatsAppURL = (product, options = {}) => {
  const { phoneNumber } = whatsappConfig;
  const message = formatWhatsAppMessage(product, options);
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};
