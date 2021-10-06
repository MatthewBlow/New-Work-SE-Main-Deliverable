import classes from './MealsSummary.module.css'

const MealsSummary = () => {
  return (
  <section className={classes.summary}>
      <h2>Delicious Food, Delivered To Your Door!</h2>
      <p>
        Choose from our selection of foods from all over the world, all from the comfort of your home!
      </p>
      <h1>
        Order Now!
      </h1>
  </section>
  )
}

export default MealsSummary;