export function New({ info, setNewDetails, setIsOpen }) {
  return (
    <div
      className="new"
      onClick={() => {
        setNewDetails(info)
        setIsOpen(true)
      }}
    >
      <img src={`https://drive.google.com/uc?export=view&id=${info.googleId}`} />
      <span className="title">{info.title}</span>
    </div>
  )
}