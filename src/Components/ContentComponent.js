export default function ContentComponent(){
    return(
        <div id="content" style={{
            width: window.parent.innerWidth,
            height: window.parent.innerHeight,
            backgroundColor: 'whitesmoke',
            display: 'flex',
            flexDirection: 'column',
            left: 0,
            top:window.parent.innerHeight,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        }}>
        Content
      </div>
    )
}