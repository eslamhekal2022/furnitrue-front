import React from 'react'
import "./mainAdmin.css"
import { useUser } from '../../context/userContext'
import { useProduct } from '../../context/productContext'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
export default function Dashboard() {
const {countUsers}=useUser()

const {productCount}=useProduct()
const {countOrders}=useCart()
  return (
    <main className="main-content">
    <header>
      <h1 className='text-capitalize'> Welcome to the dashboard</h1>
    </header>
    <section className="cards">
   
    <Link to={"allOrders"}>
    <div className="card">
    <h3>Orders</h3>
    <p>{countOrders}</p>
  </div>
    </Link>

  <Link to={"AllUser"}> 
    <div className="card">
  <h3>Users</h3>
  <p>{countUsers}</p>
</div>
</Link>
      <Link to={"allProducts"}>

      <div className="card">
        <h3>Products</h3>
        <p>{productCount}</p>
      </div>
      </Link>

    </section>
  </main>  )
}
