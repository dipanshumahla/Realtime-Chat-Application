import React,{useState} from 'react';
import Link from 'next/link';
import Info from '@/components/small/Info';

function Home(props) {
    
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [info, showInfo] = useState(props.info);

    const nameHandler = (event) => setName(event.target.value);
    const roomHandler = (event) => setRoom(event.target.value);
    const joinHandler = (event) => (!room || !name) ? event.preventDefault() : null;
    
    return (
      <>
        <main>
          {info && <Info info={info} showInfo={showInfo} />}
          <form>
            <h2>Realtime Chat Application</h2>

            <input className="text-input" type="text" placeholder="Enter your name" onChange={nameHandler} />
            <input className="text-input mt-10" type="text" placeholder="Enter Room Key" onChange={roomHandler} />

            <Link onClick={joinHandler} href={{pathname: "/chat", query: { name, room }}}>
              <a className="btn mt-20">Join</a>
            </Link>
          </form>
        </main>
      </>
    )
}

Home.getInitialProps = (context) => {
  return { info:context.error }
};

export default Home;