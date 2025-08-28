import React, { useState, useEffect, useRef } from 'react';
import api from '../api/api';

const Admin = () => {
  // Product CRUD
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState('products');
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', brand: '', price: '', stock: '', category_id: '', description: '' });
  const productModalRef = useRef();
  const categoryModalRef = useRef();
  const supplierModalRef = useRef();
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
  // Supplier CRUD
  const [suppliers, setSuppliers] = useState([]);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [newSupplier, setNewSupplier] = useState({ name: '', contact_person: '', phone: '', email: '', address: '' });

  useEffect(() => {
    fetchAll();
    api.get('suppliers/').then(res => setSuppliers(res.data));
    // eslint-disable-next-line
  }, []);

  const fetchAll = () => {
    api.get('products/').then(res => setProducts(res.data));
    api.get('categories/').then(res => setCategories(res.data));
    api.get('orders/').then(res => setOrders(res.data));
    api.get('users/').then(res => setUsers(res.data)).catch(() => setUsers([]));
    api.get('suppliers/').then(res => setSuppliers(res.data));
  };

  // Product Handlers
  const handleProductChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.category_id) {
      setAlert({ type: 'danger', message: 'Please fill all required fields.' });
      return;
    }
    try {
      await api.post('products/', newProduct);
      setAlert({ type: 'success', message: 'Product added successfully.' });
      setNewProduct({ name: '', brand: '', price: '', stock: '', category_id: '', description: '' });
      fetchAll();
      window.bootstrap && window.bootstrap.Modal.getOrCreateInstance(productModalRef.current).hide();
    } catch {
      setAlert({ type: 'danger', message: 'Failed to add product.' });
    }
  };
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      brand: product.brand,
      price: product.price,
      stock: product.stock,
      category_id: product.category.id,
      description: product.description
    });
    setTimeout(() => {
      window.bootstrap && window.bootstrap.Modal.getOrCreateInstance(productModalRef.current).show();
    }, 100);
  };
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.category_id) {
      setAlert({ type: 'danger', message: 'Please fill all required fields.' });
      return;
    }
    try {
      await api.put(`products/${editingProduct.id}/`, newProduct);
      setAlert({ type: 'success', message: 'Product updated successfully.' });
      setEditingProduct(null);
      setNewProduct({ name: '', brand: '', price: '', stock: '', category_id: '', description: '' });
      fetchAll();
      window.bootstrap && window.bootstrap.Modal.getOrCreateInstance(productModalRef.current).hide();
    } catch {
      setAlert({ type: 'danger', message: 'Failed to update product.' });
    }
  };
  const handleDeleteProduct = async (id) => {
    try {
      await api.delete(`products/${id}/`);
      setAlert({ type: 'success', message: 'Product deleted.' });
      fetchAll();
    } catch {
      setAlert({ type: 'danger', message: 'Failed to delete product.' });
    }
  };

  // Category Handlers
  const handleCategoryChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory({ name: category.name, description: category.description });
    setTimeout(() => {
      window.bootstrap && window.bootstrap.Modal.getOrCreateInstance(categoryModalRef.current).show();
    }, 100);
  };
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.name) {
      setAlert({ type: 'danger', message: 'Category name is required.' });
      return;
    }
    try {
      await api.post('categories/', newCategory);
      setAlert({ type: 'success', message: 'Category added.' });
      setNewCategory({ name: '', description: '' });
      fetchAll();
      window.bootstrap && window.bootstrap.Modal.getOrCreateInstance(categoryModalRef.current).hide();
    } catch {
      setAlert({ type: 'danger', message: 'Failed to add category.' });
    }
  };
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.name) {
      setAlert({ type: 'danger', message: 'Category name is required.' });
      return;
    }
    try {
      await api.put(`categories/${editingCategory.id}/`, newCategory);
      setAlert({ type: 'success', message: 'Category updated.' });
      setEditingCategory(null);
      setNewCategory({ name: '', description: '' });
      fetchAll();
      window.bootstrap && window.bootstrap.Modal.getOrCreateInstance(categoryModalRef.current).hide();
    } catch {
      setAlert({ type: 'danger', message: 'Failed to update category.' });
    }
  };
  const handleDeleteCategory = async (id) => {
    try {
      await api.delete(`categories/${id}/`);
      setAlert({ type: 'success', message: 'Category deleted.' });
      fetchAll();
    } catch {
      setAlert({ type: 'danger', message: 'Failed to delete category.' });
    }
  };

  // Supplier Handlers
  const handleSupplierChange = (e) => {
    setNewSupplier({ ...newSupplier, [e.target.name]: e.target.value });
  };
  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier);
    setNewSupplier({
      name: supplier.name,
      contact_person: supplier.contact_person,
      phone: supplier.phone,
      email: supplier.email,
      address: supplier.address
    });
    setTimeout(() => {
      window.bootstrap && window.bootstrap.Modal.getOrCreateInstance(supplierModalRef.current).show();
    }, 100);
  };
  const handleAddSupplier = async (e) => {
    e.preventDefault();
    if (!newSupplier.name) {
      setAlert({ type: 'danger', message: 'Supplier name is required.' });
      return;
    }
    try {
      await api.post('suppliers/', newSupplier);
      setAlert({ type: 'success', message: 'Supplier added.' });
      setNewSupplier({ name: '', contact_person: '', phone: '', email: '', address: '' });
      api.get('suppliers/').then(res => setSuppliers(res.data));
      window.bootstrap && window.bootstrap.Modal.getOrCreateInstance(supplierModalRef.current).hide();
    } catch {
      setAlert({ type: 'danger', message: 'Failed to add supplier.' });
    }
  };
  const handleUpdateSupplier = async (e) => {
    e.preventDefault();
    if (!newSupplier.name) {
      setAlert({ type: 'danger', message: 'Supplier name is required.' });
      return;
    }
    try {
      await api.put(`suppliers/${editingSupplier.id}/`, newSupplier);
      setAlert({ type: 'success', message: 'Supplier updated.' });
      setEditingSupplier(null);
      setNewSupplier({ name: '', contact_person: '', phone: '', email: '', address: '' });
      api.get('suppliers/').then(res => setSuppliers(res.data));
      window.bootstrap && window.bootstrap.Modal.getOrCreateInstance(supplierModalRef.current).hide();
    } catch {
      setAlert({ type: 'danger', message: 'Failed to update supplier.' });
    }
  };
  const handleDeleteSupplier = async (id) => {
    try {
      await api.delete(`suppliers/${id}/`);
      setAlert({ type: 'success', message: 'Supplier deleted.' });
      api.get('suppliers/').then(res => setSuppliers(res.data));
    } catch {
      setAlert({ type: 'danger', message: 'Failed to delete supplier.' });
    }
  };

  // User Handlers
  const handleUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const handleAddUser = async (e) => {
    e.preventDefault();
    await api.post('register/', newUser);
    setNewUser({ username: '', email: '', password: '' });
    fetchAll();
  };
  const handleDeleteUser = async (id) => {
    await api.delete(`users/${id}/`).catch(()=>{}); // Only works if backend allows
    fetchAll();
  };

  // Order Handler
  const handleDeleteOrder = async (id) => {
    await api.delete(`orders/${id}/`).catch(()=>{});
    fetchAll();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4" style={{ color: '#e10600' }}>Admin Dashboard</h2>
      {alert.message && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" aria-label="Close" onClick={()=>setAlert({type:'',message:''})}></button>
        </div>
      )}
      <div className="btn-group mb-3">
        <button className={`btn btn-dark${tab==='products'?' active':''}`} onClick={()=>setTab('products')}>Products</button>
        <button className={`btn btn-danger${tab==='categories'?' active':''}`} onClick={()=>setTab('categories')}>Categories</button>
        <button className={`btn btn-warning${tab==='orders'?' active':''}`} onClick={()=>setTab('orders')}>Orders</button>
        <button className={`btn btn-secondary${tab==='users'?' active':''}`} onClick={()=>setTab('users')}>Users</button>
        <button className={`btn btn-info${tab==='suppliers'?' active':''}`} onClick={()=>setTab('suppliers')}>Suppliers</button>
      </div>
      {tab === 'products' && (
        <div>
          <h4>Products</h4>
          <button className="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#productModal" onClick={()=>{setEditingProduct(null);setNewProduct({ name: '', brand: '', price: '', stock: '', category_id: '', description: '' });}}>Add Product</button>
          <table className="table table-striped table-bordered">
            <thead style={{ background: '#ff4500', color: '#fff' }}>
              <tr>
                <th>Name</th><th>Brand</th><th>SKU</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>{p.name}</td><td>{p.brand}</td><td>{p.sku}</td><td>{p.category && p.category.name}</td><td>{p.price}</td><td>{p.stock}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-warning me-2" onClick={()=>handleEditProduct(p)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={()=>handleDeleteProduct(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Product Modal */}
          <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true" ref={productModalRef}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="productModalLabel">{editingProduct ? 'Edit Product' : 'Add Product'}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setEditingProduct(null);setNewProduct({ name: '', brand: '', price: '', stock: '', category_id: '', description: '' });}}></button>
                  </div>
                  <div className="modal-body row g-3">
                    <div className="col-md-4">
                      <input name="name" value={newProduct.name} onChange={handleProductChange} className="form-control" placeholder="Name" required />
                    </div>
                    <div className="col-md-4">
                      <input name="brand" value={newProduct.brand} onChange={handleProductChange} className="form-control" placeholder="Brand" />
                    </div>
                    <div className="col-md-4">
                      <input name="price" value={newProduct.price} onChange={handleProductChange} className="form-control" placeholder="Price" type="number" required />
                    </div>
                    <div className="col-md-4">
                      <input name="stock" value={newProduct.stock} onChange={handleProductChange} className="form-control" placeholder="Stock" type="number" required />
                    </div>
                    <div className="col-md-4">
                      <select name="category_id" value={newProduct.category_id} onChange={handleProductChange} className="form-control" required>
                        <option value="">Category</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <input name="description" value={newProduct.description} onChange={handleProductChange} className="form-control" placeholder="Description" />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{setEditingProduct(null);setNewProduct({ name: '', brand: '', price: '', stock: '', category_id: '', description: '' });}}>Cancel</button>
                    <button type="submit" className="btn btn-success">{editingProduct ? 'Update' : 'Add'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {tab === 'categories' && (
        <div>
          <h4>Categories</h4>
          <button className="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#categoryModal" onClick={()=>{setEditingCategory(null);setNewCategory({ name: '', description: '' });}}>Add Category</button>
          <ul className="list-group">
            {categories.map(c => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={c.id}>
                {c.name}
                <span>
                  <button className="btn btn-sm btn-outline-warning me-2" onClick={()=>handleEditCategory(c)}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={()=>handleDeleteCategory(c.id)}>Delete</button>
                </span>
              </li>
            ))}
          </ul>

          {/* Category Modal */}
          <div className="modal fade" id="categoryModal" tabIndex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true" ref={categoryModalRef}>
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="categoryModalLabel">{editingCategory ? 'Edit Category' : 'Add Category'}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setEditingCategory(null);setNewCategory({ name: '', description: '' });}}></button>
                  </div>
                  <div className="modal-body row g-3">
                    <div className="col-12">
                      <input name="name" value={newCategory.name} onChange={handleCategoryChange} className="form-control mb-2" placeholder="Name" required />
                    </div>
                    <div className="col-12">
                      <input name="description" value={newCategory.description} onChange={handleCategoryChange} className="form-control" placeholder="Description" />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{setEditingCategory(null);setNewCategory({ name: '', description: '' });}}>Cancel</button>
                    <button type="submit" className="btn btn-success">{editingCategory ? 'Update' : 'Add'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {tab === 'suppliers' && (
        <div>
          <h4>Suppliers</h4>
          <button className="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#supplierModal" onClick={()=>{setEditingSupplier(null);setNewSupplier({ name: '', contact_person: '', phone: '', email: '', address: '' });}}>Add Supplier</button>
          <table className="table table-bordered">
            <thead style={{ background: '#ff4500', color: '#fff' }}>
              <tr>
                <th>Name</th><th>Contact</th><th>Phone</th><th>Email</th><th>Address</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map(s => (
                <tr key={s.id}>
                  <td>{s.name}</td><td>{s.contact_person}</td><td>{s.phone}</td><td>{s.email}</td><td>{s.address}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-warning me-2" onClick={()=>handleEditSupplier(s)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={()=>handleDeleteSupplier(s.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Supplier Modal */}
          <div className="modal fade" id="supplierModal" tabIndex="-1" aria-labelledby="supplierModalLabel" aria-hidden="true" ref={supplierModalRef}>
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={editingSupplier ? handleUpdateSupplier : handleAddSupplier}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="supplierModalLabel">{editingSupplier ? 'Edit Supplier' : 'Add Supplier'}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setEditingSupplier(null);setNewSupplier({ name: '', contact_person: '', phone: '', email: '', address: '' });}}></button>
                  </div>
                  <div className="modal-body row g-3">
                    <div className="col-12 mb-2">
                      <input name="name" value={newSupplier.name} onChange={handleSupplierChange} className="form-control" placeholder="Name" required />
                    </div>
                    <div className="col-12 mb-2">
                      <input name="contact_person" value={newSupplier.contact_person} onChange={handleSupplierChange} className="form-control" placeholder="Contact Person" />
                    </div>
                    <div className="col-12 mb-2">
                      <input name="phone" value={newSupplier.phone} onChange={handleSupplierChange} className="form-control" placeholder="Phone" />
                    </div>
                    <div className="col-12 mb-2">
                      <input name="email" value={newSupplier.email} onChange={handleSupplierChange} className="form-control" placeholder="Email" />
                    </div>
                    <div className="col-12 mb-2">
                      <input name="address" value={newSupplier.address} onChange={handleSupplierChange} className="form-control" placeholder="Address" />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{setEditingSupplier(null);setNewSupplier({ name: '', contact_person: '', phone: '', email: '', address: '' });}}>Cancel</button>
                    <button type="submit" className="btn btn-success">{editingSupplier ? 'Update' : 'Add'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {tab === 'orders' && (
        <div>
          <h4>Orders</h4>
          <table className="table table-bordered">
            <thead style={{ background: '#000', color: '#fff' }}>
              <tr>
                <th>ID</th><th>User</th><th>Status</th><th>Created</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td>{o.id}</td><td>{o.user && o.user.username}</td><td>{o.status}</td><td>{o.created_at}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-info me-2">View</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={()=>handleDeleteOrder(o.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab === 'users' && (
        <div>
          <h4>Users</h4>
          <form className="row g-3 mb-4" onSubmit={handleAddUser}>
            <div className="col-md-3">
              <input name="username" value={newUser.username} onChange={handleUserChange} className="form-control" placeholder="Username" required />
            </div>
            <div className="col-md-4">
              <input name="email" value={newUser.email} onChange={handleUserChange} className="form-control" placeholder="Email" required />
            </div>
            <div className="col-md-3">
              <input name="password" value={newUser.password} onChange={handleUserChange} className="form-control" placeholder="Password" required />
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-success w-100">Add</button>
            </div>
          </form>
          <table className="table table-bordered">
            <thead style={{ background: '#e10600', color: '#fff' }}>
              <tr>
                <th>ID</th><th>Username</th><th>Email</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td><td>{u.username}</td><td>{u.email}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger" onClick={()=>handleDeleteUser(u.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
