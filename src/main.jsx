import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from'./store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout, Login} from './components'
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import AllPost from './pages/AllPost.jsx'
import Addpost from './pages/Addpost.jsx'
import EditPost from './pages/EditPosts.jsx'
import Post from './pages/Post.jsx'
const route = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element: <Home/>
      },{
        path:'/login',
        element:(
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path:"/singup",
        element:(
          <AuthLayout authentication={false}>
            <Signup/>
          </AuthLayout>
        )

      },
      {
        path:"/All-post",
        element:(
          <AuthLayout authentication >
            <AllPost />
          </AuthLayout>
        )
      },
      {
        path:"/Add-post",
        element:(
          <AuthLayout authentication >
            <Addpost />
          </AuthLayout>
        )
      },
      {
        path:"/Edit-post/:slug",
        element:(
          <AuthLayout authentication >
            <EditPost/>
          </AuthLayout>
        )
      },
      {
        path:"/Post/:slug",
        element: <Post />
        
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={route}/>
    </Provider>
  </StrictMode>,
)
