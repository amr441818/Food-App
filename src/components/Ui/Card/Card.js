import calsses from './Card.module.css'
const Card = props =>{
    return <div className={calsses.card}>
        {props.children}
    </div>
}
export default Card;