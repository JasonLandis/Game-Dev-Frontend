import { useState, useEffect } from 'react';

export default function Home() {

  interface IGameBase {
    name: string;
    description: string;
    release_date?: string;
    price?: number;
  }
  
  interface IGameFull extends IGameBase {
    game_id: number;
    developer: number;
  }

  const [games, setGames] = useState<IGameFull[] | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/games')
      .then(response => response.json())
      .then(json => setGames(json))
      .catch(error => console.error(error));
  }, []);

  const gameGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    gap: '30px'
  };

  const gameContainerStyle = {
    border: '2px solid black',
    borderRadius: '8px'
  };

  const gameObjectStyle = {
    padding: '10px'
  };

  const gamePropertyStyle = {
    marginBottom: '10px'
  }

  return (
    <>
      <div className="container">
        {games ? 
          <div style={gameGridStyle}>
            {games.map(game => (
              <div key={game.game_id} style={gameContainerStyle}>
                <div style={gameObjectStyle}>
                  <div style={{ fontSize: '25px', marginBottom: '15px' }}><strong>{game.name}</strong></div>
                  <div style={gamePropertyStyle}><strong>Description:</strong> {game.description}</div>
                  <div style={gamePropertyStyle}><strong>Developer:</strong> {game.developer}</div>
                  <div style={gamePropertyStyle}><strong>Release Date:</strong> {game.release_date ?? 'Undetermined'}</div>
                  <div><strong>Price:</strong> {game.price ? `$${game.price.toFixed(2)}` : 'Undetermined'}</div>
                </div>                
              </div>
            ))}
          </div> 
        : 'Loading...'}
      </div>
    </>
  );
}
