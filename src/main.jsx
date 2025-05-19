import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import Datapassing from './ContextApi/Datapassing.jsx'
import { AddtocartProvider } from './ContextApi/AddtocartProvider.jsx'
import Product from './ContextApi/Product.jsx'
import Authentication from './ContextApi/Authentication.jsx'

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
        <Authentication>
            <Product>
                <Datapassing>
                    <AddtocartProvider>
                        <App />
                    </AddtocartProvider>
                </Datapassing>
            </Product>
        </Authentication>
    </BrowserRouter>

)
