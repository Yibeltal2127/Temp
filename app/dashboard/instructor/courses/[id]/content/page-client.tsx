'use client';

import { useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import * as Collapsible from '@radix-ui/react-collapsible';
import {
  ChevronRight,
  ChevronDown,
  BookOpen,
  PlayCircle,
  FileText,
  ListTodo,
  CheckCircle,
  Lock,
  Plus,
  Edit,
  Video,
  Clock,
  Users,
  Settings,
  Eye,
} from 'lucide-react';
import Link from 'next/link';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface Lesson {
  id: string;
  title: string;
  content: any;
  video_url?: string;
  duration?: number;
  position: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

interface Module {
  id: string;
  title: string;
  description?: string;
  position: number;
  is_published: boolean;
  created_at: string;
  lessons: Lesson[];
}

interface CourseDetails {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'pending_review' | 'published' | 'rejected';
  is_published: boolean;
  created_at: string;
  updated_at: string;
  course_type?: 'self_paced' | 'cohort_based';
  modules: Module[];
}

interface CourseContentPageClientProps {
  course: CourseDetails;
}

type EditorItem = 
  | { type: 'lesson'; data: Lesson; moduleId: string }
  | { type: 'module'; data: Module }
  | { type: 'new_lesson'; moduleId: string }
  | { type: 'new_module' }
  | null;

function LessonContentViewer({ content }: { content: any }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
  });

  if (!editor) return null;

  return (
    <div className="prose max-w-none">
      <EditorContent editor={editor} />
    </div>
  );
}

function ModuleEditor({ module, onSave, onCancel }: { 
  module?: Module; 
  onSave: (data: any) => void; 
  onCancel: () => void; 
}) {
  const [title, setTitle] = useState(module?.title || '');
  const [description, setDescription] = useState(module?.description || '');

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-[#2C3E50] mb-4">
          {module ? 'Edit Module' : 'Create New Module'}
        </h3>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-[#2C3E50] mb-2">
          Module Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-[#E5E8E8] rounded-lg focus:border-[#4ECDC4] focus:outline-none"
          placeholder="Enter module title..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2C3E50] mb-2">
          Description (Optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full p-3 border border-[#E5E8E8] rounded-lg focus:border-[#4ECDC4] focus:outline-none"
          placeholder="Brief description of this module..."
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button 
          onClick={() => onSave({ title, description })}
          className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white flex-1"
          disabled={!title.trim()}
        >
          {module ? 'Update Module' : 'Create Module'}
        </Button>
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="border-[#E5E8E8] hover:border-[#4ECDC4]"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

function LessonEditor({ lesson, moduleId, courseType, onSave, onCancel }: { 
  lesson?: Lesson; 
  moduleId: string;
  courseType?: string;
  onSave: (data: any) => void; 
  onCancel: () => void; 
}) {
  const [title, setTitle] = useState(lesson?.title || '');
  const [videoUrl, setVideoUrl] = useState(lesson?.video_url || '');
  const [duration, setDuration] = useState(lesson?.duration?.toString() || '');

  const editor = useEditor({
    extensions: [StarterKit],
    content: lesson?.content || '',
  });

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-[#2C3E50] mb-4">
          {lesson ? 'Edit Lesson' : 'Create New Lesson'}
        </h3>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-[#2C3E50] mb-2">
          Lesson Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-[#E5E8E8] rounded-lg focus:border-[#4ECDC4] focus:outline-none"
          placeholder="Enter lesson title..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2C3E50] mb-2">
          Video URL (Optional)
        </label>
        <input
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full p-3 border border-[#E5E8E8] rounded-lg focus:border-[#4ECDC4] focus:outline-none"
          placeholder="https://..."
        />
      </div>

      {videoUrl && (
        <div>
          <label className="block text-sm font-medium text-[#2C3E50] mb-2">
            Duration (seconds)
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-3 border border-[#E5E8E8] rounded-lg focus:border-[#4ECDC4] focus:outline-none"
            placeholder="300"
          />
        </div>
      )}

      {courseType === 'cohort_based' && (
        <div className="p-4 bg-[#4ECDC4]/5 rounded-lg border border-[#4ECDC4]/20">
          <h4 className="font-medium text-[#2C3E50] mb-2">Cohort Features</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-[#E5E8E8]" />
              <span className="text-sm text-[#2C3E50]">Live session required</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-[#E5E8E8]" />
              <span className="text-sm text-[#2C3E50]">Assignment submission</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-[#E5E8E8]" />
              <span className="text-sm text-[#2C3E50]">Peer review required</span>
            </label>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-[#2C3E50] mb-2">
          Lesson Content
        </label>
        <div className="border border-[#E5E8E8] rounded-lg min-h-[200px] p-3">
          <EditorContent editor={editor} />
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button 
          onClick={() => onSave({ 
            title, 
            video_url: videoUrl || null, 
            duration: duration ? parseInt(duration) : null,
            content: editor?.getHTML() || null,
            module_id: moduleId
          })}
          className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white flex-1"
          disabled={!title.trim()}
        >
          {lesson ? 'Update Lesson' : 'Create Lesson'}
        </Button>
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="border-[#E5E8E8] hover:border-[#4ECDC4]"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

function getLessonType(lesson: Lesson): 'video' | 'document' | 'todo' {
  if (lesson.video_url) return 'video';
  if (lesson.title.toLowerCase().includes('todo') || lesson.title.toLowerCase().includes('task')) return 'todo';
  return 'document';
}

function getLessonIcon(type: 'video' | 'document' | 'todo') {
  switch (type) {
    case 'video':
      return <PlayCircle className="w-4 h-4 text-[#FF6B35]" />;
    case 'todo':
      return <ListTodo className="w-4 h-4 text-[#4ECDC4]" />;
    default:
      return <FileText className="w-4 h-4 text-[#2C3E50]" />;
  }
}

function formatDuration(duration?: number): string {
  if (!duration) return '';
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default function CourseContentPageClient({ course }: CourseContentPageClientProps) {
  const [activeEditorItem, setActiveEditorItem] = useState<EditorItem>(null);
  const [openModules, setOpenModules] = useState<Set<string>>(new Set());
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggleModule = (moduleId: string) => {
    const newOpenModules = new Set(openModules);
    if (newOpenModules.has(moduleId)) {
      newOpenModules.delete(moduleId);
    } else {
      newOpenModules.add(moduleId);
    }
    setOpenModules(newOpenModules);
  };

  const toggleSection = (sectionId: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(sectionId)) {
      newOpenSections.delete(sectionId);
    } else {
      newOpenSections.add(sectionId);
    }
    setOpenSections(newOpenSections);
  };

  const categorizeLesson = (lessons: Lesson[]) => {
    const categories = {
      videos: lessons.filter(lesson => getLessonType(lesson) === 'video'),
      documents: lessons.filter(lesson => getLessonType(lesson) === 'document'),
      todos: lessons.filter(lesson => getLessonType(lesson) === 'todo'),
    };
    return categories;
  };

  const getTotalStats = () => {
    const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
    const publishedLessons = course.modules.reduce(
      (acc, module) => acc + module.lessons.filter(lesson => lesson.is_published).length,
      0
    );
    const totalVideos = course.modules.reduce(
      (acc, module) => acc + module.lessons.filter(lesson => getLessonType(lesson) === 'video').length,
      0
    );
    const totalDuration = course.modules.reduce(
      (acc, module) => 
        acc + module.lessons.reduce((lessonAcc, lesson) => lessonAcc + (lesson.duration || 0), 0),
      0
    );

    return { totalLessons, publishedLessons, totalVideos, totalDuration };
  };

  const handleSaveModule = async (data: any) => {
    // TODO: Implement API call to save module
    console.log('Saving module:', data);
    setActiveEditorItem(null);
  };

  const handleSaveLesson = async (data: any) => {
    // TODO: Implement API call to save lesson
    console.log('Saving lesson:', data);
    setActiveEditorItem(null);
  };

  const stats = getTotalStats();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/dashboard/instructor" className="hover:text-foreground">
              Instructor Dashboard
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/dashboard/instructor/courses/${course.id}`} className="hover:text-foreground">
              {course.title}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>Content Management</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-[#2C3E50] mb-2">Course Content</h1>
                <h2 className="text-xl text-[#2C3E50]/80 mb-2">{course.title}</h2>
                <div className="flex items-center gap-3">
                  <p className="text-[#2C3E50]/60">{course.description}</p>
                  {course.course_type && (
                    <Badge 
                      variant="outline" 
                      className={course.course_type === 'cohort_based' ? 'border-[#4ECDC4] text-[#4ECDC4]' : 'border-[#FF6B35] text-[#FF6B35]'}
                    >
                      {course.course_type === 'cohort_based' ? 'Cohort-Based' : 'Self-Paced'}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link href={`/dashboard/instructor/courses/${course.id}/preview`}>
                  <Button variant="outline" className="border-[#E5E8E8] hover:border-[#4ECDC4]">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Course
                  </Button>
                </Link>
                <Button 
                  onClick={() => setActiveEditorItem({ type: 'new_module' })}
                  className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Module
                </Button>
              </div>
            </div>

            {/* Course Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <Card className="border-[#E5E8E8]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#4ECDC4]/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-[#4ECDC4]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#2C3E50]">{stats.totalLessons}</p>
                      <p className="text-sm text-[#2C3E50]/60">Total Lessons</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#E5E8E8]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#2C3E50]">{stats.publishedLessons}</p>
                      <p className="text-sm text-[#2C3E50]/60">Published</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#E5E8E8]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center">
                      <Video className="w-5 h-5 text-[#FF6B35]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#2C3E50]">{stats.totalVideos}</p>
                      <p className="text-sm text-[#2C3E50]/60">Video Lessons</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#E5E8E8]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#2C3E50]">{formatDuration(stats.totalDuration)}</p>
                      <p className="text-sm text-[#2C3E50]/60">Total Duration</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Course Curriculum */}
            <div className="lg:col-span-2">
              <Card className="border-[#E5E8E8]">
                <CardHeader>
                  <CardTitle className="text-[#2C3E50] flex items-center justify-between">
                    <span>Course Curriculum</span>
                    <Button 
                      size="sm" 
                      onClick={() => setActiveEditorItem({ type: 'new_lesson', moduleId: course.modules[0]?.id || '' })}
                      className="bg-[#4ECDC4] hover:bg-[#4ECDC4]/90 text-white"
                      disabled={course.modules.length === 0}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Lesson
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {course.modules.length === 0 ? (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-[#4ECDC4] mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">No Modules Yet</h3>
                      <p className="text-[#2C3E50]/60 mb-4">
                        Start building your course by adding modules and lessons.
                      </p>
                      <Button 
                        onClick={() => setActiveEditorItem({ type: 'new_module' })}
                        className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create First Module
                      </Button>
                    </div>
                  ) : (
                    course.modules.map((module, moduleIndex) => {
                      const categories = categorizeLesson(module.lessons);
                      const isModuleOpen = openModules.has(module.id);

                      return (
                        <Collapsible.Root
                          key={module.id}
                          open={isModuleOpen}
                          onOpenChange={() => toggleModule(module.id)}
                        >
                          <div className="border border-[#E5E8E8] rounded-lg overflow-hidden">
                            <Collapsible.Trigger asChild>
                              <div className="flex items-center justify-between p-4 bg-[#F7F9F9] hover:bg-[#4ECDC4]/5 cursor-pointer transition-colors">
                                <div className="flex items-center gap-3">
                                  {isModuleOpen ? (
                                    <ChevronDown className="w-5 h-5 text-[#4ECDC4]" />
                                  ) : (
                                    <ChevronRight className="w-5 h-5 text-[#4ECDC4]" />
                                  )}
                                  <div className="w-8 h-8 bg-[#FF6B35] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                    {moduleIndex + 1}
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-[#2C3E50]">{module.title}</h3>
                                    <p className="text-sm text-[#2C3E50]/60">
                                      {module.lessons.length} lessons • {module.lessons.filter(l => l.is_published).length} published
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant={module.is_published ? "default" : "secondary"}
                                    className={module.is_published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}
                                  >
                                    {module.is_published ? "Published" : "Draft"}
                                  </Badge>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="text-[#4ECDC4]"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveEditorItem({ type: 'module', data: module });
                                    }}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </Collapsible.Trigger>

                            <Collapsible.Content>
                              <div className="p-4 space-y-4">
                                {/* Add Lesson Button */}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setActiveEditorItem({ type: 'new_lesson', moduleId: module.id })}
                                  className="w-full border-dashed border-[#4ECDC4] text-[#4ECDC4] hover:bg-[#4ECDC4]/5"
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add Lesson to {module.title}
                                </Button>

                                {/* Video Lessons */}
                                {categories.videos.length > 0 && (
                                  <Collapsible.Root
                                    open={openSections.has(`${module.id}-videos`)}
                                    onOpenChange={() => toggleSection(`${module.id}-videos`)}
                                  >
                                    <Collapsible.Trigger asChild>
                                      <div className="flex items-center gap-2 p-2 bg-[#FF6B35]/5 rounded-lg cursor-pointer hover:bg-[#FF6B35]/10 transition-colors">
                                        {openSections.has(`${module.id}-videos`) ? (
                                          <ChevronDown className="w-4 h-4 text-[#FF6B35]" />
                                        ) : (
                                          <ChevronRight className="w-4 h-4 text-[#FF6B35]" />
                                        )}
                                        <Video className="w-4 h-4 text-[#FF6B35]" />
                                        <span className="font-medium text-[#2C3E50]">Class Videos</span>
                                        <Badge variant="outline" className="ml-auto">
                                          {categories.videos.length}
                                        </Badge>
                                      </div>
                                    </Collapsible.Trigger>
                                    <Collapsible.Content>
                                      <div className="ml-6 mt-2 space-y-2">
                                        {categories.videos.map((lesson) => (
                                          <div
                                            key={lesson.id}
                                            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                                              activeEditorItem?.type === 'lesson' && activeEditorItem.data.id === lesson.id
                                                ? 'border-[#FF6B35] bg-[#FF6B35]/5'
                                                : 'border-[#E5E8E8] hover:border-[#4ECDC4] hover:bg-[#4ECDC4]/5'
                                            }`}
                                            onClick={() => setActiveEditorItem({ type: 'lesson', data: lesson, moduleId: module.id })}
                                          >
                                            <div className="flex items-center gap-3">
                                              {getLessonIcon('video')}
                                              <div>
                                                <h4 className="font-medium text-[#2C3E50]">{lesson.title}</h4>
                                                <div className="flex items-center gap-2 text-sm text-[#2C3E50]/60">
                                                  {lesson.duration && (
                                                    <>
                                                      <Clock className="w-3 h-3" />
                                                      <span>{formatDuration(lesson.duration)}</span>
                                                    </>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              {lesson.is_published ? (
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                              ) : (
                                                <Lock className="w-4 h-4 text-gray-400" />
                                              )}
                                              <Button 
                                                size="sm" 
                                                variant="ghost" 
                                                className="text-[#4ECDC4]"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setActiveEditorItem({ type: 'lesson', data: lesson, moduleId: module.id });
                                                }}
                                              >
                                                <Edit className="w-3 h-3" />
                                              </Button>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </Collapsible.Content>
                                  </Collapsible.Root>
                                )}

                                {/* Todo Lists */}
                                {categories.todos.length > 0 && (
                                  <Collapsible.Root
                                    open={openSections.has(`${module.id}-todos`)}
                                    onOpenChange={() => toggleSection(`${module.id}-todos`)}
                                  >
                                    <Collapsible.Trigger asChild>
                                      <div className="flex items-center gap-2 p-2 bg-[#4ECDC4]/5 rounded-lg cursor-pointer hover:bg-[#4ECDC4]/10 transition-colors">
                                        {openSections.has(`${module.id}-todos`) ? (
                                          <ChevronDown className="w-4 h-4 text-[#4ECDC4]" />
                                        ) : (
                                          <ChevronRight className="w-4 h-4 text-[#4ECDC4]" />
                                        )}
                                        <ListTodo className="w-4 h-4 text-[#4ECDC4]" />
                                        <span className="font-medium text-[#2C3E50]">Todo Lists</span>
                                        <Badge variant="outline" className="ml-auto">
                                          {categories.todos.length}
                                        </Badge>
                                      </div>
                                    </Collapsible.Trigger>
                                    <Collapsible.Content>
                                      <div className="ml-6 mt-2 space-y-2">
                                        {categories.todos.map((lesson) => (
                                          <div
                                            key={lesson.id}
                                            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                                              activeEditorItem?.type === 'lesson' && activeEditorItem.data.id === lesson.id
                                                ? 'border-[#4ECDC4] bg-[#4ECDC4]/5'
                                                : 'border-[#E5E8E8] hover:border-[#4ECDC4] hover:bg-[#4ECDC4]/5'
                                            }`}
                                            onClick={() => setActiveEditorItem({ type: 'lesson', data: lesson, moduleId: module.id })}
                                          >
                                            <div className="flex items-center gap-3">
                                              {getLessonIcon('todo')}
                                              <div>
                                                <h4 className="font-medium text-[#2C3E50]">{lesson.title}</h4>
                                              </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              {lesson.is_published ? (
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                              ) : (
                                                <Lock className="w-4 h-4 text-gray-400" />
                                              )}
                                              <Button 
                                                size="sm" 
                                                variant="ghost" 
                                                className="text-[#4ECDC4]"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setActiveEditorItem({ type: 'lesson', data: lesson, moduleId: module.id });
                                                }}
                                              >
                                                <Edit className="w-3 h-3" />
                                              </Button>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </Collapsible.Content>
                                  </Collapsible.Root>
                                )}

                                {/* Documents/Notes */}
                                {categories.documents.length > 0 && (
                                  <Collapsible.Root
                                    open={openSections.has(`${module.id}-documents`)}
                                    onOpenChange={() => toggleSection(`${module.id}-documents`)}
                                  >
                                    <Collapsible.Trigger asChild>
                                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                        {openSections.has(`${module.id}-documents`) ? (
                                          <ChevronDown className="w-4 h-4 text-[#2C3E50]" />
                                        ) : (
                                          <ChevronRight className="w-4 h-4 text-[#2C3E50]" />
                                        )}
                                        <FileText className="w-4 h-4 text-[#2C3E50]" />
                                        <span className="font-medium text-[#2C3E50]">Class Notes</span>
                                        <Badge variant="outline" className="ml-auto">
                                          {categories.documents.length}
                                        </Badge>
                                      </div>
                                    </Collapsible.Trigger>
                                    <Collapsible.Content>
                                      <div className="ml-6 mt-2 space-y-2">
                                        {categories.documents.map((lesson) => (
                                          <div
                                            key={lesson.id}
                                            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                                              activeEditorItem?.type === 'lesson' && activeEditorItem.data.id === lesson.id
                                                ? 'border-[#2C3E50] bg-gray-50'
                                                : 'border-[#E5E8E8] hover:border-[#4ECDC4] hover:bg-[#4ECDC4]/5'
                                            }`}
                                            onClick={() => setActiveEditorItem({ type: 'lesson', data: lesson, moduleId: module.id })}
                                          >
                                            <div className="flex items-center gap-3">
                                              {getLessonIcon('document')}
                                              <div>
                                                <h4 className="font-medium text-[#2C3E50]">{lesson.title}</h4>
                                              </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              {lesson.is_published ? (
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                              ) : (
                                                <Lock className="w-4 h-4 text-gray-400" />
                                              )}
                                              <Button 
                                                size="sm" 
                                                variant="ghost" 
                                                className="text-[#4ECDC4]"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setActiveEditorItem({ type: 'lesson', data: lesson, moduleId: module.id });
                                                }}
                                              >
                                                <Edit className="w-3 h-3" />
                                              </Button>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </Collapsible.Content>
                                  </Collapsible.Root>
                                )}
                              </div>
                            </Collapsible.Content>
                          </div>
                        </Collapsible.Root>
                      );
                    })
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Dynamic Editor/Preview Panel */}
            <div className="lg:col-span-1">
              <Card className="border-[#E5E8E8] sticky top-6">
                <CardHeader>
                  <CardTitle className="text-[#2C3E50]">
                    {activeEditorItem?.type === 'lesson' && 'Edit Lesson'}
                    {activeEditorItem?.type === 'module' && 'Edit Module'}
                    {activeEditorItem?.type === 'new_lesson' && 'Create Lesson'}
                    {activeEditorItem?.type === 'new_module' && 'Create Module'}
                    {!activeEditorItem && 'Content Editor'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {activeEditorItem?.type === 'lesson' && (
                    <LessonEditor
                      lesson={activeEditorItem.data}
                      moduleId={activeEditorItem.moduleId}
                      courseType={course.course_type}
                      onSave={handleSaveLesson}
                      onCancel={() => setActiveEditorItem(null)}
                    />
                  )}
                  
                  {activeEditorItem?.type === 'module' && (
                    <ModuleEditor
                      module={activeEditorItem.data}
                      onSave={handleSaveModule}
                      onCancel={() => setActiveEditorItem(null)}
                    />
                  )}
                  
                  {activeEditorItem?.type === 'new_lesson' && (
                    <LessonEditor
                      moduleId={activeEditorItem.moduleId}
                      courseType={course.course_type}
                      onSave={handleSaveLesson}
                      onCancel={() => setActiveEditorItem(null)}
                    />
                  )}
                  
                  {activeEditorItem?.type === 'new_module' && (
                    <ModuleEditor
                      onSave={handleSaveModule}
                      onCancel={() => setActiveEditorItem(null)}
                    />
                  )}
                  
                  {!activeEditorItem && (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-[#4ECDC4] mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">Ready to Edit</h3>
                      <p className="text-[#2C3E50]/60 mb-4">
                        Select a module or lesson to edit, or create new content using the buttons above.
                      </p>
                      <div className="space-y-2">
                        <Button 
                          onClick={() => setActiveEditorItem({ type: 'new_module' })}
                          className="w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Create Module
                        </Button>
                        {course.modules.length > 0 && (
                          <Button 
                            onClick={() => setActiveEditorItem({ type: 'new_lesson', moduleId: course.modules[0].id })}
                            variant="outline"
                            className="w-full border-[#4ECDC4] text-[#4ECDC4] hover:bg-[#4ECDC4]/5"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Create Lesson
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}