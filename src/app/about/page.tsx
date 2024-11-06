export default async function AboutPage() {

  const data = await fetch('http://localhost:4000/api/v1/games');
  const value = await data.json();

  interface gameObject {
    id: number;
    name: string;
    price: number;
  }

  return (    
    <main>
      <h1>Game List</h1>
      <ul>
        {value.map((game: gameObject) => (
          <li key={game.id}>
            <h2>{game.name}</h2>
            <p>Price: ${game.price}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
