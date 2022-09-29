import '../../styles/index.css'

const UserData = (props) => {
    return (
        <div className="user-data">
            <img className='avatar' src={props.userDetails.avatar}></img>
            <div className='text-block'>
                <h2>{`${props.userDetails.first_name} ${props.userDetails.last_name}`}</h2>
                <p>{props.userDetails.email}</p>
            </div>
        </div>
    )
}
export default UserData;