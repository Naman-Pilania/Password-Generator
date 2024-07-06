import React, { useState, useCallback, useEffect , useRef} from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    for (let i = 0; i < length; i++) { // Changed from i = 1 and corrected the loop condition
      const char = Math.floor(Math.random() * str.length); // Fixed random character selection logic
      pass += str.charAt(char); // Corrected the password construction
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]); // Wrapped dependencies in an array and removed setPassword

  const copytoclip = useCallback(()=>{
    passwordref.current?.select()
    // passwordref.current?.setSelectionRange(0,9)
    window.navigator.clipboard.writeText(password);
  },[password])
  useEffect(() => {
    passwordgenerator();
  }, [length, charAllowed, numberAllowed, passwordgenerator]); // Added passwordgenerator to the dependency array

  const passwordref=useRef(null);
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 bg-gray-800 my-10 py-10 text-orange-500'>
        <h1 className='text-center text-4xl text-white my-2 p-2'>Password Generator</h1>
        <div className='flex shadow rounded-lg mb-4 overflow-hidden'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordref}
          />
          <button
          onClick={copytoclip}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            // onClick={() => navigator.clipboard.writeText(password)} // Added onClick handler to copy password
          >
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2 mb-4'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(Number(e.target.value))} // Changed to Number() to properly set length
            />
            <label>Length: {length}</label>
          </div>
        </div>
        <div className='flex text-sm gap-x-2 mb-4'>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              checked={numberAllowed} // Changed from defaultChecked to checked
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)} // Simplified state toggle and removed console.log
            />
            <label htmlFor="numberInput">Include Numbers</label>
          </div>
        </div>
        <div className='flex text-sm gap-x-2 mb-4'>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              checked={charAllowed} // Changed from defaultChecked to checked
              id="characterInput"
              onChange={() => setCharAllowed((prev) => !prev)} // Simplified state toggle and removed console.log
            />
            <label htmlFor="characterInput">Include Special Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
