interface PlanHeaderProps {
  title: string;
  description: string;
}

export const PlanHeader = ({ title, description }: PlanHeaderProps) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 bg-clip-text text-transparent bg-gradient-to-r from-ev-dark via-ev-DEFAULT to-ev-light">
        {title}
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};