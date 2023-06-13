using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;

namespace PWMSBackend.CustomIdGenerator
{
    public class SppIdGenerator
    {
        private DataContext _dbContext;
        private Random _random;

        public SppIdGenerator(DataContext dbContext)
        {
            _dbContext = dbContext;
            _random = new Random();
        }

        public string GenerateSppId()
        {
            const string prefix = "SPP";

            string numericPart = GenerateRandomNumericPart();
            string customId = prefix + numericPart;

            // Check if the generated SppId already exists in the database
            while (IsDuplicateSppId(customId))
            {
                numericPart = GenerateRandomNumericPart();
                customId = prefix + numericPart;
            }

            return customId;
        }

        private string GenerateRandomNumericPart()
        {
            int minValue = 0;
            int maxValue = 99999; // 5-digit number range
            int randomValue = _random.Next(minValue, maxValue + 1); // Add 1 to include maxValue in the range

            string numericPart = randomValue.ToString("D5"); // Pad the random value with leading zeros
            return numericPart;
        }

        private bool IsDuplicateSppId(string sppId)
        {
            return _dbContext.SubProcurementPlans.Any(s => s.SppId == sppId);
        }
    }

}
