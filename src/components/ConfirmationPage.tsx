import { NavigationContext } from '../App';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ConfirmationPageProps {
  navigation: NavigationContext;
}

export function ConfirmationPage({ navigation }: ConfirmationPageProps) {
  const handleGoBack = () => {
    if (navigation.userRole === 'student') {
      navigation.navigateTo('student');
    } else if (navigation.userRole === 'faculty') {
      navigation.navigateTo('faculty');
    } else if (navigation.userRole === 'admin') {
      navigation.navigateTo('admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-purple-50 to-gray-50 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardContent className="pt-12 pb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="flex justify-center mb-6"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-4"
          >
            <h1 className="text-3xl">Success!</h1>
            <p className="text-gray-600 text-lg">
              {navigation.confirmationMessage || 'Operation completed successfully!'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-3 mt-8"
          >
            <Button
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white h-12"
              onClick={handleGoBack}
            >
              Dashboard
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-12"
              onClick={handleGoBack}
            >
              Go Back
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
