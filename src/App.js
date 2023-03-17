import Filmes from './componentes/filmes';

export default function App() {
  console.log('Teste no console do navegador');

  return (
    <div>
      <header>
        <div className="bg-gray-100 mx-auto p-4">
          <h1 className="text-center font-semibold text-xl">
            Projeto base para o Módulo React I
          </h1>
        </div>
      </header>

      <main>
        <div className="container mx-auto p-4">
          <h2>O conteúdo fica aqui.</h2>
          <Filmes />
        </div>
      </main>
    </div>
  );
}
