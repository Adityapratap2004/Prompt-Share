import EditPrompt from '@components/EditPrompt';
import { Suspense } from 'react';
 

const UpdatePromptPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPrompt />
    </Suspense>
  );
};

export default UpdatePromptPage;