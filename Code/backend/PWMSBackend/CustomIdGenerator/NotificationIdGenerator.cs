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

        //public int GenerateNotificationId()
        //{
        //    const int numericPartLength = 5;

        //    int numericPart = GenerateRandomNumericPart(numericPartLength);
        //    int customId = numericPart;

        //    // Check if the generated NotificationId already exists in the database
        //    while (IsDuplicateNotificationId(customId))
        //    {
        //        numericPart = GenerateRandomNumericPart(numericPartLength);
        //        customId = numericPart;
        //    }

        //    return customId;
        //}

        //private int GenerateRandomNumericPart(int length)
        //{
        //    int minValue = 0;
        //    int maxValue = (int)Math.Pow(10, length) - 1; // Calculate the maximum value based on the length
        //    int randomValue = _random.Next(minValue, maxValue + 1); // Add 1 to include maxValue in the range

        //    return randomValue;
        //}

        //private bool IsDuplicateNotificationId(int notificationId)
        //{
        //    return _dbContext.UserNotifications.Any(s => s.notificationId == notificationId);
        //}


        public string GenerateNotificationId()
        {
            const string prefix = "NTF";
            const int numericPartLength = 5;

            int currentId = GetMaxNotificationIdNumericPart() + 1; // Get the maximum numeric part from the existing Notification IDs in the database

            string numericPart = currentId.ToString($"D{numericPartLength}"); // Pad the current ID with leading zeros
            string customId = prefix + numericPart;

            // Check if the generated NotificationId already exists in the database
            while (IsDuplicateNotificationId(customId))
            {
                currentId++; // Increment the current ID if duplicate found
                numericPart = currentId.ToString($"D{numericPartLength}"); // Pad the updated ID with leading zeros
                customId = prefix + numericPart;
            }

            return customId;
        }

        private int GetMaxNotificationIdNumericPart()
        {
            string maxNumericPart = _dbContext.UserNotifications
                .Select(s => s.notificationId.Substring(3)) // Extract the numeric part by removing the prefix
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

        private bool IsDuplicateNotificationId(string NotificationId)
        {
            return _dbContext.UserNotifications.Any(s => s.notificationId == NotificationId);
        }


    }
}
