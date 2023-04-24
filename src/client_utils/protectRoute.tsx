//this is a HOC , it's a component that's gonna receive component 

import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { ComponentType } from 'react'
const ProtectedRoute = (WrappedComponent: ComponentType) => {
    const ProtectedRoute = (props: any) => {
      const router = useRouter()
      const {status}=useSession()
      if(status=="unauthenticated"){
        router.replace('/')
      }
  
      return <WrappedComponent {...props} />
    }
  
    return ProtectedRoute
  }
  
export default ProtectedRoute