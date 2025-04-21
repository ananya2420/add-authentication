function PortfolioForm(){
    return(
        <form>
            <div>
                <label htmlFor="new-password">New Password</label>
                <input typre='password' id='new-password' />

            </div>

            <div>
                <label htmlFor="old-password">Old Password</label>
                <input typre='password' id='old-password' />
                
            </div>
            <div>
                <button>Change button</button>
            </div>
        </form>
    )

}
export default PortfolioForm;