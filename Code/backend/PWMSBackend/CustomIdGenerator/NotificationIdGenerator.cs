using PWMSBackend.Data;

namespace PWMSBackend.CustomIdGenerator
{
    public class NotificationIdGenerator
    {
        private DataContext _dbContext;
        private Random _random;

        public NotificationIdGenerator(DataContext dbContext)
        {
            _dbContext = dbContext;
            _random = new Random();
        }

        public int GenerateNotificationId()
        {
            const int numericPartLength = 5;

            int numericPart = GenerateRandomNumericPart(numericPartLength);
            int customId = numericPart;

            // Check if the generated NotificationId already exists in the database
            while (IsDuplicateNotificationId(customId))
            {
                numericPart = GenerateRandomNumericPart(numericPartLength);
                customId = numericPart;
            }

            return customId;
        }

        private int GenerateRandomNumericPart(int length)
        {
            int minValue = 0;
            int maxValue = (int)Math.Pow(10, length) - 1; // Calculate the maximum value based on the length
            int randomValue = _random.Next(minValue, maxValue + 1); // Add 1 to include maxValue in the range

            return randomValue;
        }

        private bool IsDuplicateNotificationId(int notificationId)
        {
            return _dbContext.UserNotifications.Any(s => s.notificationId == notificationId);
        }


        //public string GenerateNotificationId()
        //{
        //    const string prefix = "NTF";
        //    const int numericPartLength = 5;

        //    string numericPart = GenerateRandomNumericPart(numericPartLength);
        //    string customId = prefix + numericPart;

        //    // Check if the generated NotificationId already exists in the database
        //    while (IsDuplicateNotificationId(customId))
        //    {
        //        numericPart = GenerateRandomNumericPart(numericPartLength);
        //        customId = prefix + numericPart;
        //    }

        //    return customId;
        //}

        //private string GenerateRandomNumericPart(int length)
        //{
        //    int minValue = 0;
        //    int maxValue = (int)Math.Pow(10, length) - 1; // Calculate the maximum value based on the length
        //    int randomValue = _random.Next(minValue, maxValue + 1); // Add 1 to include maxValue in the range

        //    string numericPart = randomValue.ToString($"D{length}"); // Pad the random value with leading zeros
        //    return numericPart;
        //}

        //private bool IsDuplicateNotificationId(string NotificationId)
        //{
        //    return _dbContext.UserNotifications.Any(s => s.notificationId == NotificationId);
        //    return true;
        //}

        //public string GenerateNotificationId()
        //{
        //    const string prefix = "NTF";

        //    string numericPart = GenerateRandomNumericPart();
        //    string customId = prefix + numericPart;

        //    // Check if the generated NotificationId already exists in the database
        //    while (IsDuplicateNotificationId(customId))
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


    }
}
