import React, {useState, useEffect} from 'react'

interface RangeSliderProps {
  name: string
  value: string
  onGradeChange: (grade: string) => void

  // New prop for handling grade change
}

const RangeSlider: React.FC<RangeSliderProps> = ({name, value, onGradeChange}) => {
  const [cgpa, setCGPA] = useState<number>(parseFloat(value))
  const grades = ['F', 'E', 'D', 'C', 'B', 'A']

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value)
    setCGPA(newValue)
    const grade = getGrade()
    console.log(grade)
    onGradeChange(grade)
  }

  const handleBlur = () => {
    const grade = getGrade()
    console.log(grade)
    onGradeChange(grade)
  }

  const getGrade = (): string => {
    const gradeIndex = Math.floor((cgpa / 6) * grades.length)
    return grades[gradeIndex]
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col text-center'>
          <input
            type='range'
            className='form-range'
            min={0}
            max={5}
            step={1}
            value={cgpa}
            style={{width: '90%', height: '15px'}}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col text-center'>
          <h5 className='text text-primary'>
            {name}: {getGrade()}
          </h5>
          {getGrade() == '' || getGrade() == undefined ? (
            <div className='text-danger mt-3 mb-3 fs-5'>Please select a value.</div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default RangeSlider
