import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='Container biography'>
      <div className="banner">
        <img src={imageUrl} alt="aboutImg" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio qui provident harum quia eius cumque hic est itaque? Doloremque totam suscipit odit! Quidem nisi nesciunt omnis a enim, doloribus laudantium dolorem veritatis cupiditate numquam earum assumenda quasi! Vitae incidunt nulla quidem, amet non deserunt sed eum at mollitia blanditiis. Eligendi!</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, corporis!</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, nisi quod labore illo est maxime iusto, molestiae explicabo eaque possimus qui totam distinctio commodi quia, dolorum dolor placeat facilis fuga vero saepe velit quo ipsa?</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia quo nostrum neque.</p>
        <p>Lorem, ipsum dolor.</p>
      </div>

      
    </div>
  )
}

export default Biography
