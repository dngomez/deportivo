export function NewDetails({ info }) {
  let pars = []
  info.body.split("\n").map((par, index) => {
    pars.push(<p key={index}>{par}</p>)
  })


  return (
    <div className="modal-new">
      <img src={`https://drive.google.com/uc?export=view&id=${info.googleId}`} />
      <span className="title">{info.title}</span>
      <span className="date">{(new Date(info.date)).toLocaleDateString()}</span>
      {pars}
      {(info.gallery) && <a className="button" target={"_blank"} href={info.gallery}>
        <span className="material-icons button-icon">image</span>
        Ver galería de imágenes
      </a>}
    </div>
  )
}