// Updated script.js
const API_BASE = '/api/csv-handler';

class InventoryManager {
  constructor() {
    this.inventoryData = [];
    this.init();
  }

  async init() {
    await this.loadInventoryData();
    this.setupEventListeners();
    this.renderInventory(this.inventoryData);
  }

  async loadInventoryData() {
    try {
      const response = await fetch(API_BASE);
      const data = await response.json();
      
      // Transform CSV data to match your expected format
      this.inventoryData = data.map(item => ({
        itemNumber: item['Item Number'] || '',
        itemName: item['Item Name'] || '',
        department: item['Department'] || '',
        price: item['Selling Price'] ? parseFloat(item['Selling Price']) : null,
        qty: item['Quantity'] ? parseInt(item['Quantity']) : null
      }));
      
      console.log('Inventory data loaded successfully:', this.inventoryData.length, 'items');
    } catch (error) {
      console.error('Error loading inventory data:', error);
      // Fallback to empty array
      this.inventoryData = [];
    }
  }

  async saveInventoryData() {
    try {
      // Transform data back to CSV format
      const csvData = this.inventoryData.map(item => ({
        'Item Number': item.itemNumber || '',
        'Item Name': item.itemName || '',
        'Department': item.department || '',
        'Selling Price': item.price || '',
        'Quantity': item.qty || ''
      }));

      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inventoryData: csvData })
      });

      if (response.ok) {
        console.log('Inventory data saved successfully');
        return true;
      } else {
        throw new Error('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving inventory data:', error);
      alert('Error saving data. Please try again.');
      return false;
    }
  }

  // Add your existing utility functions here...
  formatPrice(price) {
    if (price === null || price === undefined || isNaN(price)) return 'N/A';
    return 'KSh ' + Number(price).toLocaleString();
  }

  getStockStatus(qty) {
    if (qty === null || qty === undefined || qty === 0) return 'out-of-stock';
    if (qty <= 5) return 'low-stock';
    return 'in-stock';
  }

  getStockText(qty) {
    if (qty === null || qty === undefined) return 'Out of Stock';
    if (qty === 0) return 'Out of Stock';
    if (qty <= 5) return `Low Stock (${qty})`;
    return `In Stock (${qty})`;
  }

  renderInventory(items) {
    const tbody = document.getElementById('inventoryBody');
    tbody.innerHTML = '';
    
    if (items.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 30px;">
            <h3>No items found</h3>
            <p>Try adjusting your search terms or filters</p>
          </td>
        </tr>
      `;
      return;
    }
    
    items.forEach(item => {
      const row = document.createElement('tr');
      const stockStatus = this.getStockStatus(item.qty);
      const stockText = this.getStockText(item.qty);
      
      row.innerHTML = `
        <td>${item.itemNumber || 'N/A'}</td>
        <td><span class="item-name">${item.itemName || 'Unnamed Item'}</span></td>
        <td><span class="department">${item.department || 'General'}</span></td>
        <td><span class="price">${this.formatPrice(item.price)}</span></td>
        <td><span class="qty ${stockStatus}">${stockText}</span></td>
        <td class="actions">
          <button class="btn btn-edit" data-id="${item.itemNumber}">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="btn btn-delete" data-id="${item.itemNumber}">
            <i class="fas fa-trash"></i> Delete
          </button>
        </td>
      `;
      
      tbody.appendChild(row);
    });

    // Update your existing edit/delete event listeners here
    this.attachRowEventListeners();
  }

  attachRowEventListeners() {
    // Add your existing event listener code for edit/delete buttons
    document.querySelectorAll('.btn-edit').forEach(button => {
      button.addEventListener('click', (e) => {
        const itemNumber = e.target.closest('.btn-edit').getAttribute('data-id');
        this.editItem(itemNumber);
      });
    });
    
    document.querySelectorAll('.btn-delete').forEach(button => {
      button.addEventListener('click', async (e) => {
        const itemNumber = e.target.closest('.btn-delete').getAttribute('data-id');
        await this.deleteItem(itemNumber);
      });
    });
  }

  async editItem(itemNumber) {
    // Your existing edit functionality
    const item = this.inventoryData.find(item => item.itemNumber === itemNumber);
    if (item) {
      // Populate modal and show it
      document.getElementById('modalTitle').textContent = 'Edit Item';
      document.getElementById('itemId').value = item.itemNumber;
      document.getElementById('itemNumber').value = item.itemNumber;
      document.getElementById('itemName').value = item.itemName;
      document.getElementById('department').value = item.department;
      document.getElementById('price').value = item.price;
      document.getElementById('quantity').value = item.qty;
      this.openModal();
    }
  }

  async deleteItem(itemNumber) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.inventoryData = this.inventoryData.filter(item => item.itemNumber !== itemNumber);
      this.renderInventory(this.inventoryData);
      await this.saveInventoryData();
    }
  }

  async saveItem() {
    const itemId = document.getElementById('itemId').value;
    const itemNumber = document.getElementById('itemNumber').value;
    const itemName = document.getElementById('itemName').value;
    const department = document.getElementById('department').value;
    const price = parseFloat(document.getElementById('price').value);
    const qty = parseInt(document.getElementById('quantity').value);
    
    if (itemId) {
      // Editing existing item
      const index = this.inventoryData.findIndex(item => item.itemNumber === itemId);
      if (index !== -1) {
        this.inventoryData[index] = { itemNumber, itemName, department, price, qty };
      }
    } else {
      // Adding new item
      if (this.inventoryData.some(item => item.itemNumber === itemNumber)) {
        alert('Item number already exists. Please use a unique item number.');
        return;
      }
      this.inventoryData.push({ itemNumber, itemName, department, price, qty });
    }
    
    this.renderInventory(this.inventoryData);
    this.closeModal();
    await this.saveInventoryData();
  }

  setupEventListeners() {
    // Your existing event listeners, but updated to use class methods
    document.getElementById('searchInput').addEventListener('input', () => this.filterInventory());
    document.getElementById('departmentFilter').addEventListener('change', () => this.filterInventory());
    document.getElementById('stockFilter').addEventListener('change', () => this.filterInventory());
    
    document.getElementById('addItemBtn').addEventListener('click', () => {
      document.getElementById('itemForm').reset();
      document.getElementById('itemId').value = '';
      document.getElementById('modalTitle').textContent = 'Add New Item';
      this.openModal();
    });
    
    document.getElementById('saveItemBtn').addEventListener('click', () => this.saveItem());
    
    // Add auto-save feature
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        this.saveInventoryData();
      }
    });
  }

  filterInventory() {
    // Your existing filter logic
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const departmentFilter = document.getElementById('departmentFilter').value;
    const stockFilter = document.getElementById('stockFilter').value;
    
    const filteredItems = this.inventoryData.filter(item => {
      if (departmentFilter && item.department !== departmentFilter) return false;
      
      if (stockFilter) {
        const status = this.getStockStatus(item.qty);
        if (status !== stockFilter) return false;
      }
      
      if (searchText) {
        const searchableText = `${item.itemNumber} ${item.itemName} ${item.department}`.toLowerCase();
        if (!searchableText.includes(searchText)) return false;
      }
      
      return true;
    });
    
    this.renderInventory(filteredItems);
  }

  openModal() {
    document.getElementById('itemModal').style.display = 'flex';
  }

  closeModal() {
    document.getElementById('itemModal').style.display = 'none';
    document.getElementById('itemForm').reset();
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  window.inventoryManager = new InventoryManager();
});