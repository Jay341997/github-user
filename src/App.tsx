import React, { useEffect, useState } from 'react';
import './App.scss';
import MyProfile from './components/MyProfile';
import Repositories from './components/Repositories';

interface Props {}
const App: React.FC<Props> = (props) => {
  const [userName, setUserName] = useState(""); 

  useEffect(() => {
    const user = window.location.pathname.slice(1);
    if (user) {
      setUserName(user);
    } else {
      window.location.replace(window.location.origin + '/Jay341997');
      setUserName('Jay341997');
    }
  }, []);

  if (!userName) {
    return <></>
  }

  return (
    <div className="App">
      <section className="myProfileSection">
        <MyProfile userName={userName} />
      </section>
      <section className="myReposSection">
        <Repositories userName={userName} />
      </section>
    </div>
  );
}

export default App;
