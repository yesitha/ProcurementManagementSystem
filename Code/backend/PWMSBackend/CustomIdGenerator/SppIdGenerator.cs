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
            const int numericPartLength = 5;

            int currentId = GetMaxSppIdNumericPart() + 1; // Get the maximum numeric part from the existing Notification IDs in the database

            string numericPart = currentId.ToString($"D{numericPartLength}"); // Pad the current ID with leading zeros
            string customId = prefix + numericPart;

            // Check if the generated SppId already exists in the database
            while (IsDuplicateSppId(customId))
            {
                currentId++; // Increment the current ID if duplicate found
                numericPart = currentId.ToString($"D{numericPartLength}"); // Pad the updated ID with leading zeros
                customId = prefix + numericPart;
            }

            return customId;
        }

        private int GetMaxSppIdNumericPart()
        {
            string maxNumericPart = _dbContext.SubProcurementPlans
                .Select(s => s.SppId.Substring(3)) // Extract the numeric part by removing the prefix
                .OrderByDescending(s => s)
                .FirstOrDefault();

            if (int.TryParse(maxNumericPart, out int maxNumericPartValue))
            {
                return maxNumericPartValue;
            }
            else
            {
                return 0; // If no existing Notification IDs are found, start from 0
            }
        }

        private bool IsDuplicateSppId(string SppId)
        {
            return _dbContext.SubProcurementPlans.Any(s => s.SppId == SppId);
        }

        //public string GenerateSppId()
        //{
        //    const string prefix = "SPP";

        //    string numericPart = GenerateRandomNumericPart();
        //    string customId = prefix + numericPart;

        //    // Check if the generated SppId already exists in the database
        //    while (IsDuplicateSppId(customId))
        //    {
        //        numericPart = GenerateRandomNumericPart();
        //        customId = prefix + numericPart;
        //    }

        //    return customId;
        //}

        //private string GenerateRandomNumericPart()
        //{
        //    int minValue = 0;
        //    int maxValue = 99999; // 5-digit number range
        //    int randomValue = _random.Next(minValue, maxValue + 1); // Add 1 to include maxValue in the range

        //    string numericPart = randomValue.ToString("D5"); // Pad the random value with leading zeros
        //    return numericPart;
        //}

        //private bool IsDuplicateSppId(string sppId)
        //{
        //    return _dbContext.SubProcurementPlans.Any(s => s.SppId == sppId);
        //}
    }

}
