import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterGroup = props => {
  const {
    onAddEmploymentTypeList,
    onRemoveEmploymentTypeList,
    onChangeSalaryRange,
    typeOfEmployment,
    salaryRange,
  } = props

  const onHandleEmpType = event => {
    const {checked, value} = event.target
    if (checked) {
      onAddEmploymentTypeList(value)
    } else {
      onRemoveEmploymentTypeList(value)
    }
  }

  const onHandleSalaryRange = event => {
    onChangeSalaryRange(event.target.value)
  }

  return (
    <div className="filter-container">
      <div className="type-of-employment-container">
        <h1>Type of Employment</h1>
        <ul className="checkbox-container">
          {employmentTypesList.map(each => (
            <li key={each.employmentTypeId} className="each-checkbox">
              <input
                value={each.employmentTypeId}
                onChange={onHandleEmpType}
                id={each.employmentTypeId}
                type="checkbox"
                checked={typeOfEmployment.includes(each.employmentTypeId)}
              />
              <label htmlFor={each.employmentTypeId}>{each.label}</label>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div className="salary-range-container">
        <h1>Salary Range</h1>
        <ul className="radiobox-container">
          {salaryRangesList.map(each => (
            <li key={each.salaryRangeId} className="each-radiobox">
              <input
                value={each.salaryRangeId}
                name="salary"
                onChange={onHandleSalaryRange}
                id={each.salaryRangeId}
                type="radio"
                checked={salaryRange === each.salaryRangeId}
              />
              <label htmlFor={each.salaryRangeId}>{each.label}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FilterGroup
