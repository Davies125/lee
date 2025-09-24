class InventoryManager {
    constructor() {
        this.inventoryData = [];
        this.filteredData = [];
        this.currentPage = 1;
        this.itemsPerPage = 50; // You can adjust this number
        this.init();
    }

    async init() {
        await this.loadInventoryData();
        this.setupEventListeners();
        this.populateDepartmentFilters();
        this.renderInventory();
        this.hideLoadingSpinner();
    }

    showLoadingSpinner() {
        document.getElementById('loadingSpinner').style.display = 'flex';
    }

    hideLoadingSpinner() {
        document.getElementById('loadingSpinner').style.display = 'none';
    }

    async loadInventoryData() {
        this.showLoadingSpinner();
        try {
            const response = await fetch('j.csv');
            const csvText = await response.text();
            this.inventoryData = this.parseCSV(csvText);
            this.filteredData = [...this.inventoryData];
            console.log('Inventory data loaded successfully:', this.inventoryData.length, 'items');
        } catch (error) {
            console.error('Error loading inventory data:', error);
            this.inventoryData = [];
            this.filteredData = [];
        }
    }

    parseCSV(csvText) {
        const lines = csvText.split('\n').filter(line => line.trim() !== '');
        const headers = lines[0].split(',').map(header => header.trim());
        
        const items = [];
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            const values = this.parseCSVLine(line);
            
            if (values.length >= headers.length) {
                const item = {
                    itemNumber: values[0] || '',
                    itemName: values[1] || '',
                    department: values[2] || '',
                    price: values[3] ? parseFloat(values[3].replace(/[^0-9.-]+/g, '')) : null,
                    qty: values[4] ? parseInt(values[4]) || 0 : 0
                };
                items.push(item);
            }
        }
        return items;
    }

    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        let i = 0;

        while (i < line.length) {
            const char = line[i];

            if (char === '"') {
                // Check for escaped quote ("")
                if (inQuotes && line[i + 1] === '"') {
                    current += '"';
                    i++; // Skip the next quote
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
            i++;
        }

        result.push(current.trim());
        return result;
    }

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
        if (qty === null || qty === undefined || qty === 0) return 'Out of Stock';
        if (qty <= 5) return `Low Stock (${qty})`;
        return `In Stock (${qty})`;
    }

    calculateTotalValue(items) {
        return items.reduce((total, item) => {
            const price = Number(item.price) || 0;
            const qty = Number(item.qty) || 0;
            return total + (price * qty);
        }, 0);
    }

    countDepartments(items) {
        const departments = new Set();
        items.forEach(item => {
            if (item.department && item.department.trim() !== '') {
                departments.add(item.department);
            }
        });
        return departments.size;
    }

    populateDepartmentFilters() {
        const departments = new Set();
        this.inventoryData.forEach(item => {
            if (item.department && item.department.trim() !== '') {
                departments.add(item.department);
            }
        });

        const departmentSelects = [
            document.getElementById('departmentFilter'),
            document.getElementById('department')
        ];

        departmentSelects.forEach(select => {
            while (select.options.length > 1) {
                select.remove(1);
            }

            const sortedDepartments = Array.from(departments).sort();
            sortedDepartments.forEach(dept => {
                const option = document.createElement('option');
                option.value = dept;
                option.textContent = dept;
                select.appendChild(option);
            });
        });
    }

    getCurrentPageData() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.filteredData.slice(startIndex, endIndex);
    }

    getTotalPages() {
        return Math.ceil(this.filteredData.length / this.itemsPerPage);
    }

    updatePagination() {
        const totalPages = this.getTotalPages();
        const pageInfo = document.getElementById('pageInfo');
        pageInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;

        document.getElementById('firstPage').disabled = this.currentPage === 1 || totalPages === 0;
        document.getElementById('prevPage').disabled = this.currentPage === 1 || totalPages === 0;
        document.getElementById('nextPage').disabled = this.currentPage === totalPages || totalPages === 0;
        document.getElementById('lastPage').disabled = this.currentPage === totalPages || totalPages === 0;
    }

    goToPage(page) {
        const totalPages = this.getTotalPages();
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.renderInventory();
        }
    }

    renderInventory() {
        const tableBody = document.getElementById('inventoryTableBody');
        tableBody.innerHTML = '';
        const noResultsMessage = document.querySelector('.no-results-message');
        
        if (this.filteredData.length === 0) {
            noResultsMessage.style.display = 'block';
            this.updateStats(this.filteredData);
            this.updatePagination();
            return;
        } else {
            noResultsMessage.style.display = 'none';
        }

        const itemsToDisplay = this.getCurrentPageData();

        itemsToDisplay.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-label="Item Number">${item.itemNumber}</td>
                <td data-label="Item Name" class="item-name">${item.itemName}</td>
                <td data-label="Department"><span class="department">${item.department}</span></td>
                <td data-label="Price" class="price">${this.formatPrice(item.price)}</td>
                <td data-label="Quantity"><span class="qty ${this.getStockStatus(item.qty)}">${this.getStockText(item.qty)}</span></td>
                <td data-label="Actions" class="actions">
                    <button class="btn btn-edit edit-btn" data-id="${item.itemNumber}">
                        <i class="fa-solid fa-pen-to-square"></i> Edit
                    </button>
                    <button class="btn btn-delete delete-btn" data-id="${item.itemNumber}">
                        <i class="fa-solid fa-trash-can"></i> Delete
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
        
        this.updateStats(this.filteredData);
        this.updatePagination();
    }

    updateStats(items) {
        document.getElementById('totalItems').textContent = items.length;
        document.getElementById('totalValue').textContent = this.formatPrice(this.calculateTotalValue(items));
        document.getElementById('totalDepartments').textContent = this.countDepartments(items);
    }

    filterInventory() {
        const searchQuery = document.getElementById('searchInput').value.toLowerCase();
        const departmentFilter = document.getElementById('departmentFilter').value.toLowerCase();
        const stockFilter = document.getElementById('stockFilter').value.toLowerCase();
        
        this.filteredData = this.inventoryData.filter(item => {
            const matchesSearch = (item.itemName && item.itemName.toLowerCase().includes(searchQuery)) ||
                                 (item.itemNumber && String(item.itemNumber).toLowerCase().includes(searchQuery));
            
            const matchesDepartment = !departmentFilter || (item.department && item.department.toLowerCase() === departmentFilter);
            
            const matchesStock = !stockFilter || this.getStockStatus(item.qty) === stockFilter;
            
            return matchesSearch && matchesDepartment && matchesStock;
        });

        this.currentPage = 1;
        this.renderInventory();
    }

    openModal(item = {}) {
        const modal = document.getElementById('itemModal');
        const modalTitle = document.getElementById('modalTitle');
        const itemId = document.getElementById('itemId');
        const itemNumberInput = document.getElementById('itemNumber');
        const itemNameInput = document.getElementById('itemName');
        const departmentInput = document.getElementById('department');
        const priceInput = document.getElementById('price');
        const quantityInput = document.getElementById('quantity');

        if (Object.keys(item).length === 0) {
            modalTitle.textContent = 'Add New Item';
            itemId.value = '';
            document.getElementById('itemForm').reset();
            itemNumberInput.disabled = false;
        } else {
            modalTitle.textContent = 'Edit Item';
            itemId.value = item.itemNumber;
            itemNumberInput.value = item.itemNumber;
            itemNumberInput.disabled = true;
            itemNameInput.value = item.itemName;
            departmentInput.value = item.department;
            priceInput.value = item.price;
            quantityInput.value = item.qty;
        }
        modal.style.display = 'flex';
    }

    closeModal() {
        document.getElementById('itemModal').style.display = 'none';
        document.getElementById('itemForm').reset();
    }

    saveItem() {
        const itemId = document.getElementById('itemId').value;
        const itemNumber = document.getElementById('itemNumber').value;
        const itemName = document.getElementById('itemName').value;
        const department = document.getElementById('department').value;
        const price = document.getElementById('price').value;
        const quantity = document.getElementById('quantity').value;
        
        if (!itemNumber || !itemName || !department || !price || !quantity) {
            alert('Please fill in all fields.');
            return;
        }

        const newItem = {
            itemNumber: itemNumber,
            itemName: itemName,
            department: department,
            price: parseFloat(price),
            qty: parseInt(quantity)
        };

        if (itemId) {
            const index = this.inventoryData.findIndex(item => item.itemNumber === itemId);
            if (index !== -1) {
                this.inventoryData[index] = newItem;
                this.filterInventory();
            }
        } else {
            const itemExists = this.inventoryData.some(item => item.itemNumber === itemNumber);
            if (itemExists) {
                alert('An item with this number already exists. Please use a unique number.');
                return;
            }
            this.inventoryData.push(newItem);
            this.filterInventory();
        }
        this.closeModal();
    }

    deleteItem(itemNumber) {
        if (confirm('Are you sure you want to delete this item?')) {
            this.inventoryData = this.inventoryData.filter(item => item.itemNumber !== itemNumber);
            this.filterInventory();
        }
    }
    
    exportToCSV() {
        const header = ["Item Number", "Item Name", "Department", "Selling Price", "Quantity"];
        const rows = this.inventoryData.map(item => [
            item.itemNumber,
            `"${item.itemName.replace(/"/g, '""')}"`,
            item.department,
            item.price,
            item.qty
        ]);

        const csvContent = "data:text/csv;charset=utf-8," 
                         + header.join(",") + "\n" 
                         + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "inventory.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    importFromCSV(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const csvText = e.target.result;
            try {
                const importedData = this.parseCSV(csvText);
                this.inventoryData = importedData;
                this.filterInventory();
                this.populateDepartmentFilters();
                alert('Inventory imported successfully!');
            } catch (error) {
                alert('Failed to import CSV. Please check the file format.');
                console.error('CSV Import Error:', error);
            }
        };
        reader.readAsText(file);
    }

    setupEventListeners() {
        document.getElementById('searchInput').addEventListener('input', () => this.filterInventory());
        document.getElementById('departmentFilter').addEventListener('change', () => this.filterInventory());
        document.getElementById('stockFilter').addEventListener('change', () => this.filterInventory());
        
        document.getElementById('firstPage').addEventListener('click', () => this.goToPage(1));
        document.getElementById('prevPage').addEventListener('click', () => this.goToPage(this.currentPage - 1));
        document.getElementById('nextPage').addEventListener('click', () => this.goToPage(this.currentPage + 1));
        document.getElementById('lastPage').addEventListener('click', () => this.goToPage(this.getTotalPages()));
        
        document.getElementById('addItemBtn').addEventListener('click', () => this.openModal());
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeModal());
        document.getElementById('saveItemBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.saveItem();
        });

        document.getElementById('inventoryTableBody').addEventListener('click', (e) => {
            if (e.target.closest('.edit-btn')) {
                const itemNumber = e.target.closest('.edit-btn').dataset.id;
                const itemToEdit = this.inventoryData.find(item => item.itemNumber === itemNumber);
                if (itemToEdit) {
                    this.openModal(itemToEdit);
                }
            } else if (e.target.closest('.delete-btn')) {
                const itemNumber = e.target.closest('.delete-btn').dataset.id;
                this.deleteItem(itemNumber);
            }
        });

        document.getElementById('exportCSV').addEventListener('click', () => this.exportToCSV());
        document.getElementById('importCSV').addEventListener('click', () => {
            document.getElementById('csvFileInput').click();
        });
        
        document.getElementById('csvFileInput').addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.importFromCSV(e.target.files[0]);
            }
        });

        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.loadInventoryData().then(() => {
                this.filterInventory();
                this.populateDepartmentFilters();
            });
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && e.target.tagName !== 'INPUT') {
                e.preventDefault();
                document.getElementById('searchInput').focus();
            }
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === document.getElementById('itemModal')) {
                this.closeModal();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.inventoryManager = new InventoryManager();
});