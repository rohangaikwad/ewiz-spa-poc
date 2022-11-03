const Indicator = ({label, count, url, icon}) => {
    return <a href={url} className="indicator">
        <label>{label}</label>
        <div className="icon-count">
            <i className={"sli icon-" + icon}></i>
            <span className="count">{count}</span>
        </div>
    </a>
}

export default Indicator;