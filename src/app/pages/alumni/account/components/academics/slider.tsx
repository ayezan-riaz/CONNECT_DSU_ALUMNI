import React, { useState } from 'react';

interface RangeSliderProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ name, value, onChange }) => {
  const [cgpa, setCGPA] = useState<number>(parseFloat(value));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setCGPA(newValue);
    onChange(event);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <input
            type="range"
            className="form-range"
            min={0}
            max={4}
            step={0.1}
            value={cgpa}
            style={{ width: '150px' }}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <p>{name}: {cgpa.toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
