import { Providers } from './provider';
import { MainRoutes } from './routes/routes';

function App() {
  return (
    <>
      <Providers>
        <MainRoutes />
      </Providers>
    </>
  );
}

export default App;
