'use client';
import './counter.css';
import '../about_global.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const CounterBox = ({ end, title, image }) => {
  return (
    <div className="counter-box">
      <div className="icon">
        <Image src={image} alt="icon" width={60} height={60} />
      </div>
      <span className="counter">{end}</span>
      <p className="title">{title}</p>
    </div>
  );
};

const Counter = () => {
  const [counters, setCounters] = useState([]);

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const res = await fetch("/frontend/ActionApi/Counter"); // consistent API
        if (!res.ok) throw new Error("Failed to fetch counters");

        const data = await res.json();
        setCounters(data.counter || []); // depends on your API response
      } catch (error) {
        console.error("Error fetching counters:", error);
      }
    };

    fetchCounters();
  }, []);

  if (!counters.length) return <div>Loading counters...</div>;

  return (
    <div className="side-space-plr pt pb counter-section">
      <div className="counter-overlay"></div>
      <div className="row m-0 p-0">
        {counters.map((item) => (
          <div className="col-md-3 col-6 p-0" key={item.id}>
            <CounterBox
              end={parseInt(item.counter_title)}
              title={item.counter_tagline}
              image={item.counter_image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Counter;
