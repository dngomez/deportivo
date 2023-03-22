import {
  BabyFootball,
  Baseball,
  Basketball,
  Billiard,
  BoardGames,
  Cycling,
  Dance,
  MartialArts,
  Paddle,
  Rollerblade,
  Running,
  Soccer,
  TableTenis,
  Tennis,
  Volleyball,
  Yoga
} from "../SVG/SvgButtons"
import "./Sports.scss"

export default function Sports() {
  return (
    <div className="sports-grid">
      <Basketball />
      <Soccer />
      <Rollerblade />
      <Baseball />
      <BoardGames />
      <TableTenis />
      <Paddle />
      <BabyFootball />
      <Tennis />
      <Volleyball />
      <Billiard />
      <Cycling />
      <Running />
      <Yoga />
      <Dance />
      <MartialArts />
    </div>
  )
}

