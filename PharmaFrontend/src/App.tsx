import { RouterProvider } from 'react-router-dom';
import Router from './Routers';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import supabase from './config/supabase';
import useAuth from './store/UseAuth';


const queryClient = new QueryClient()

function App() {

  const setCurrentUser = useAuth(state => state.setCurrentUser)
  supabase.auth.onAuthStateChange((event, session) => {
    setCurrentUser(session);
  })

  // useEffect(() => {
  //   loadCurrentUser()
  // }, [loadCurrentUser])


  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router} />
    </QueryClientProvider>
  )
}

export default App
