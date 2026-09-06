// ################################## 
// Visitor Counter Script
// ################################## 

/**
 * Initializes and manages the visitor counter
 * Stores visitor count in localStorage
 * Only increments when in PRODUCTION mode
 * 
 * Configuration:
 * - Change IS_PRODUCTION to true when deploying to production
 * - In development (IS_PRODUCTION = false), counter displays but doesn't increment
 */

const VisitorCounter = {
  // ⚙️ CONFIGURATION - Change this when deploying to production
  IS_PRODUCTION: false,  // Set to TRUE when going live
  
  // Storage key for localStorage
  storageKey: 'portfolioVisitorsCount',
  
  // Counter element ID
  counterElementId: 'visitor-count',

  /**
   * Initialize the visitor counter
   */
  init() {
    // Get current count from localStorage
    let visitorsCount = this.getCount();
    
    // Only increment if in PRODUCTION mode
    if (this.IS_PRODUCTION) {
      visitorsCount++;
      this.setCount(visitorsCount);
      console.log(`[Visitor Counter] 🟢 PRODUCTION MODE - Counter incremented. Total visitors: ${visitorsCount}`);
    } else {
      console.log(`[Visitor Counter] 🟡 DEVELOPMENT MODE - Counter NOT incremented (stays at ${visitorsCount}). Set IS_PRODUCTION = true for production.`);
    }
    
    // Update the DOM
    this.updateDisplay();
  },

  /**
   * Get the visitor count from localStorage
   * @returns {number} The current visitor count
   */
  getCount() {
    const count = localStorage.getItem(this.storageKey);
    return count ? parseInt(count, 10) : 0;
  },

  /**
   * Set the visitor count in localStorage
   * @param {number} count - The new visitor count
   */
  setCount(count) {
    localStorage.setItem(this.storageKey, count.toString());
  },

  /**
   * Update the visitor count display in the DOM
   */
  updateDisplay() {
    const counterElement = document.getElementById(this.counterElementId);
    
    if (counterElement) {
      const count = this.getCount();
      // Format number with thousands separator (e.g., 1,234)
      counterElement.textContent = count.toLocaleString('fr-FR');
      
      // Add animation effect
      counterElement.style.animation = 'none';
      // Trigger reflow to restart animation
      void counterElement.offsetWidth;
      counterElement.style.animation = 'pulse 0.5s ease-in-out';
    }
  },

  /**
   * Reset the counter (useful for testing)
   */
  reset() {
    this.setCount(0);
    this.updateDisplay();
    console.log('[Visitor Counter] Counter has been reset to 0');
  },

  /**
   * Set production mode (call this when deploying to production)
   * @param {boolean} isProduction - true for production, false for development
   */
  setProductionMode(isProduction) {
    this.IS_PRODUCTION = isProduction;
    const mode = isProduction ? '🟢 PRODUCTION' : '🟡 DEVELOPMENT';
    console.log(`[Visitor Counter] Mode switched to: ${mode}`);
  },

  /**
   * Get current mode status
   */
  getMode() {
    return this.IS_PRODUCTION ? 'PRODUCTION' : 'DEVELOPMENT';
  }
};

// Initialize counter when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    VisitorCounter.init();
  });
} else {
  // DOM is already loaded
  VisitorCounter.init();
}
