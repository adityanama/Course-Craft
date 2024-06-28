
const getAvgRating = (rating) => {

    if (rating?.length === 0) return 0

    const totalReviewCount = rating?.reduce((acc, curr) => {
        acc += curr.rating
        return acc
    }, 0)

    const multiplier = Math.pow(10,1);
    const avgRating = ((totalReviewCount / rating.length) * multiplier)/multiplier

    return avgRating
};

export default getAvgRating

