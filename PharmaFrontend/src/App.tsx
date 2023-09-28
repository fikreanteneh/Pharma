import { RouterProvider } from 'react-router-dom';
import Router from './Routers';

import useAuth from './state/store/useAuth';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient()

function App() {

  const loadCurrentUser = useAuth(state => state.loadCurrentUser)
  useEffect(() => {
    loadCurrentUser()
  }, [loadCurrentUser])


  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router} />
    </QueryClientProvider>
  )
}

export default App
