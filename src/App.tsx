import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/CollegeBasketballTeams.json');
        const data = await response.json();
        setTeams(data.teams);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  function Header() {
    return (
      <div>
        <h1>Welcome to March Madness!</h1>
        <h2>Below you will find information about each team</h2>
      </div>
    );
  }

  function TeamCard({ team }: { team: any }) {
    const cardStyle: React.CSSProperties = {
      width: '300px', // Set your desired width
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
    };

    return (
      <div style={cardStyle}>
        <h2>{team.school}</h2>
        <p>Mascot: {team.name}</p>
        <p>
          Location: {team.city}, {team.state}
        </p>
      </div>
    );
  }

  function CardList() {
    const cardListStyle: React.CSSProperties = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    };

    return (
      <div style={cardListStyle}>
        {teams.map((team) => (
          <TeamCard key={team.tid} team={team} />
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Render the Header and Cards components */}
      {teams.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <Header />
          <CardList />
        </>
      )}
    </div>
  );
};

export default App;
