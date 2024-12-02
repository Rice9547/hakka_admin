import {useExerciseMutations, useStoryExercises, useStoryExercisesCount} from '../api/exercise';
import {useSWRConfig} from "swr";

export const useStoryExerciseCount = () => {
  const { data, error, isLoading } = useStoryExercisesCount();

  return {
    exercises: data?.data || [],
    isLoading,
    isError: error
  };
};

export const useStoryExerciseList = (story_id) => {
  const { data, error, isLoading } = useStoryExercises(story_id);

  return {
    exercises: data?.data || [],
    isLoading,
    isError: error
  };
}

export const useExerciseActions = () => {
  const { mutate } = useSWRConfig();
  const { createExercise, updateExercise, deleteExercise } = useExerciseMutations();

  const ensureAnswerType = (data) => {
    if (data.type === 0) {
      return {
        ...data,
        choices: []
      };
    } else {
      return {
        ...data,
        answers: []
      };
    }
  };

  const handleCreateExercise = async (story_id, data) => {
    data = ensureAnswerType(data);
    await createExercise(story_id, data);
    mutateStoryExercise(mutate, story_id);
  };

  const handleUpdateExercise = async (story_id, id, data) => {
    data = ensureAnswerType(data);
    await updateExercise(story_id, id, data);
    mutateStoryExercise(mutate, story_id);
  };

  const handleDeleteExercise = async (story_id, id) => {
    await deleteExercise(story_id, id);
    mutateStoryExercise(mutate, story_id);
  };

  return {
    createExercise: handleCreateExercise,
    updateExercise: handleUpdateExercise,
    deleteExercise: handleDeleteExercise
  };
}

export const mutateStoryExercise = (mutate, story_id) => {
  mutate(`/admin/story/${story_id}/exercise`);
}