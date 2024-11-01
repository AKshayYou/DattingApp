namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateOnly pDOB)
        {
            var today = DateOnly.FromDateTime(DateTime.Now);

            var age = today.Year - pDOB.Year;

            if (pDOB > today.AddYears(-age)) { age--; }
            return age;
        }
    }
}
