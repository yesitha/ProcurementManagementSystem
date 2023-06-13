using PWMSBackend.Data;

namespace PWMSBackend.CustomIdGenerator
{
    public class MppIdGenerator
    {
        private DataContext _dbContext;
        private Random _random;

        public MppIdGenerator(DataContext dbContext)
        {
            _dbContext = dbContext;
            _random = new Random();
        }

        public string GenerateMppId()
        {
            const string prefix = "MPP";

            string numericPart = GenerateRandomNumericPart();
            string customId = prefix + numericPart;

            // Check if the generated MppId already exists in the database
            while (IsDuplicateMppId(customId))
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

        private bool IsDuplicateMppId(string mppId)
        {
            return _dbContext.MasterProcurementPlans.Any(s => s.MppId == mppId);
        }
    }
}
