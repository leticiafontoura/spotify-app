export default function Button (props) {
    return (
        <button type="button" className={props.kind}>{props.children}</button>
    )
}