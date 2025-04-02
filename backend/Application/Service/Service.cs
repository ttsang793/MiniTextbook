using Application.Interface;
using Core.Interface;

namespace Application.Service;

public class Service : IService
{
    private readonly IUnitOfWork _unitOfWork;
    private IBookService? _bookService;
    private IPublisherService? _publisherService;
    private ISeriesService? _seriesService;
    private ISubjectService? _subjectService;

    public Service(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public IBookService Books => _bookService ??= new BookService(_unitOfWork);
    public IPublisherService Publishers => _publisherService ??= new PublisherService(_unitOfWork);
    public ISeriesService Series => _seriesService ??= new SeriesService(_unitOfWork);
    public ISubjectService Subjects => _subjectService ??= new SubjectService(_unitOfWork);
}
