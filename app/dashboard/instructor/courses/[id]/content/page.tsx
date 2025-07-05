import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CourseContentPageClient from './page-client';

interface CourseContentPageProps {
  params: {
    id: string;
  };
}

export default async function CourseContentPage({ params }: CourseContentPageProps) {
  const supabase = createServerComponentClient({ cookies });
  const { id: courseId } = params;

  // Get session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  // Fetch course data with modules and lessons
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select(`
      *,
      modules(
        id,
        title,
        description,
        position,
        is_published,
        created_at,
        lessons(
          id,
          title,
          content,
          video_url,
          duration,
          position,
          is_published,
          created_at,
          updated_at
        )
      )
    `)
    .eq('id', courseId)
    .single();

  if (courseError || !course) {
    redirect('/dashboard/instructor/courses');
  }

  // Verify course ownership
  if (course.instructor_id !== session.user.id) {
    redirect('/dashboard/instructor/courses');
  }

  // Sort modules and lessons by position
  if (course.modules) {
    course.modules.sort((a: any, b: any) => a.position - b.position);
    course.modules.forEach((module: any) => {
      if (module.lessons) {
        module.lessons.sort((a: any, b: any) => a.position - b.position);
      }
    });
  }

  return <CourseContentPageClient course={course} />;
}