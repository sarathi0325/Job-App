const SkillCard = props => {
  const {skill} = props
  const {name, imgUrl} = skill
  return (
    <li key={name} className="skill-description">
      <img width="50px" alt={name} src={imgUrl} />
      <p>{name}</p>
    </li>
  )
}

export default SkillCard
