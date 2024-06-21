const IframePage = () => {
  return (
    <div className='size-full'>
      <div className='flex size-full items-center justify-center'>
        <iframe
          src='https://www.spatial.io/embed/Buddy-Blitz-654965ac75a12ef6a86cd763?share=7456046816804876294'
          width='800px'
          height='500px'
          allow='camera; fullscreen; autoplay; display-capture; microphone; clipboard-write'
        ></iframe>
      </div>
      <div className='flex size-full items-center justify-center'>
        <iframe
          src='https://www.spatial.io/embed/Racing-Empire-64b570a71c1f96fd5ea6ca36?share=1111938719881275452'
          width='800px'
          height='500px'
          allow='camera; fullscreen; autoplay; display-capture; microphone; clipboard-write'
        ></iframe>
      </div>
      <div className='flex size-full flex-col items-center justify-center'>
        <iframe width='420' height='315' src='https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=0&mute=1'></iframe>
        {/* Playlist */}
        {/* <h1>YouTube Playlist</h1>
        <iframe
          width='720'
          height='405'
          src='https://www.youtube.com/embed/VIDEO_ID?playlist=VIDEOID_1,VIDEOID_2'
          frameborder='0'
          allowfullscreen
        ></iframe> */}
        {/* YT Controls */}
        <iframe width='420' height='315' src='https://www.youtube.com/embed/tgbNymZ7vqY?controls=0'></iframe>
      </div>
      <div className='h-20'></div>
    </div>
  )
}

export default IframePage
